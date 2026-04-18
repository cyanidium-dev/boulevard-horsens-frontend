import { NextResponse } from "next/server";
import type { ContactTelegramBody } from "@/types/contactTelegram";

const MAX_MESSAGE_LEN = 3800;

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function buildPlainText(data: ContactTelegramBody): string {
  const lines = [
    "📩 Ny henvendelse",
    data.source ? `Kilde: ${data.source}` : null,
    "",
    `Navn: ${data.name.trim()}`,
    data.phone ? `Telefon: ${data.phone.trim()}` : null,
    `E-mail: ${data.email.trim()}`,
    data.address ? `Adresse: ${data.address.trim()}` : null,
    "",
    "Besked:",
    data.message.trim() || "(ingen besked)",
  ].filter((line): line is string => line != null);

  let text = lines.join("\n");
  if (text.length > MAX_MESSAGE_LEN) {
    text = `${text.slice(0, MAX_MESSAGE_LEN - 20)}\n\n[afkortet]`;
  }
  return text;
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Telegram er ikke konfigureret på serveren." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Manglende data" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = data.name;
  const email = data.email;
  const messageRaw = data.message;

  if (!isNonEmptyString(name) || !isNonEmptyString(email)) {
    return NextResponse.json(
      { error: "Navn og e-mail er påkrævet." },
      { status: 400 },
    );
  }

  const messageStr =
    typeof messageRaw === "string" ? messageRaw.trim() : "";

  const payload: ContactTelegramBody = {
    name: String(name).trim(),
    email: String(email).trim(),
    message: messageStr,
    phone: isNonEmptyString(data.phone) ? String(data.phone).trim() : undefined,
    address: isNonEmptyString(data.address) ? String(data.address).trim() : undefined,
    source: isNonEmptyString(data.source) ? String(data.source).trim() : undefined,
  };

  const text = buildPlainText(payload);

  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  let tgResponse: Response;
  try {
    tgResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { error: "Kunne ikke forbinde til Telegram." },
      { status: 502 },
    );
  }

  const tgJson = (await tgResponse.json()) as { ok?: boolean; description?: string };

  if (!tgResponse.ok || !tgJson.ok) {
    return NextResponse.json(
      { error: tgJson.description ?? "Telegram afviste beskeden." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
