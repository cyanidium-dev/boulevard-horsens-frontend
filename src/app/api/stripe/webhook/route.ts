import { NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";
import { render } from "@react-email/render";
import { client } from "@/lib/sanityClient";
import { GIFT_CARDS_QUERY } from "@/lib/queries";
import { GiftCardCustomerEmail } from "@/components/shared/emailTemplates/GiftCardCustomerEmail";
import type { GiftCard } from "@/types/giftCard";

export const runtime = "nodejs";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const SENDER_EMAIL_ADDRESS = process.env.SENDER_EMAIL_ADDRESS || "";
const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_ID || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2026-04-22.dahlia",
    })
  : null;

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("da-DK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

function buildTelegramMessage({
  customerName,
  customerEmail,
  amountLabel,
}: {
  customerName: string;
  customerEmail: string;
  amountLabel: string;
}): string {
  const mailHref = `mailto:${customerEmail}`;
  const lines: string[] = [];

  lines.push("💳 <b>Boulevard</b> <i>· gavekort betalt</i>");
  lines.push("");
  lines.push(`👤 <b>Navn:</b> ${escapeHtml(customerName)}`);
  lines.push(
    `✉️ <b>E-mail:</b> <a href="${escapeHtml(mailHref)}">${escapeHtml(customerEmail)}</a>`,
  );
  lines.push(`💰 <b>Beløb:</b> ${escapeHtml(amountLabel)}`);

  return lines.join("\n");
}

async function sendTelegramNotification(html: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return;
  }

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      parse_mode: "HTML",
      text: html,
      disable_web_page_preview: true,
    }),
  });
}

export async function POST(req: Request) {
  if (!stripe || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 500 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 },
    );
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true });
  }

  const customerEmail =
    session.customer_details?.email || session.customer_email || "";
  if (!customerEmail) {
    return NextResponse.json(
      { error: "Customer email is missing in checkout session." },
      { status: 400 },
    );
  }

  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 10,
      expand: ["data.price"],
    });

    const firstItem = lineItems.data[0];
    const priceId =
      typeof firstItem?.price === "string"
        ? firstItem.price
        : firstItem?.price?.id || "";

    if (!priceId) {
      return NextResponse.json(
        { error: "Unable to resolve Stripe price ID from session." },
        { status: 400 },
      );
    }

    const giftCards = await client.fetch<GiftCard[]>(GIFT_CARDS_QUERY);
    const giftCard = giftCards.find((card) => card.stripePriceId === priceId);

    if (!giftCard) {
      return NextResponse.json(
        { error: `Gift card not found for price ID: ${priceId}` },
        { status: 404 },
      );
    }

    const certificateUrl = giftCard.certificatePdf?.asset?.url;
    if (!certificateUrl) {
      return NextResponse.json(
        { error: `Certificate PDF is missing for price ID: ${priceId}` },
        { status: 400 },
      );
    }

    const certificateResponse = await fetch(certificateUrl);
    if (!certificateResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch certificate PDF from Sanity." },
        { status: 502 },
      );
    }

    const certificateBuffer = Buffer.from(await certificateResponse.arrayBuffer());
    const certificateFilename =
      giftCard.certificatePdf?.asset?.originalFilename ||
      `gavekort-${giftCard.amount}.pdf`;

    const customerName = session.customer_details?.name || "Kunde";
    const paidAmount = session.amount_total ?? Math.round(giftCard.amount * 100);
    const currency = session.currency || "dkk";
    const amountLabel = formatAmount(paidAmount, currency);
    const date = formatDate(new Date());

    if (!SENDER_EMAIL_ADDRESS) {
      return NextResponse.json(
        { error: "SENDER_EMAIL_ADDRESS is not configured." },
        { status: 500 },
      );
    }

    const customerHtml = await render(
      GiftCardCustomerEmail({
        name: customerName,
        email: customerEmail,
        amountLabel,
        date,
      }),
    );

    await resend.emails.send({
      from: `Boulevard Beauty Salon <${SENDER_EMAIL_ADDRESS}>`,
      to: customerEmail,
      subject: "Tak for dit køb af gavekort",
      html: customerHtml,
      attachments: [
        {
          filename: certificateFilename,
          content: certificateBuffer.toString("base64"),
        },
      ],
    });

    await sendTelegramNotification(
      buildTelegramMessage({
        customerName,
        customerEmail,
        amountLabel,
      }),
    );

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process Stripe checkout webhook." },
      { status: 500 },
    );
  }
}
