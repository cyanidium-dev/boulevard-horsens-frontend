import axios from "axios";

import type { ContactTelegramBody } from "@/types/contactTelegram";

export type { ContactTelegramBody };

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Bevarer linjeskift i brugerens besked */
function escapeHtmlMultiline(text: string): string {
  return text.split("\n").map((line) => escapeHtml(line)).join("\n");
}

/**
 * Stram, læsbar HTML til Telegram — få udsmykninger, ingen emojis.
 */
function buildContactHtml(data: ContactTelegramBody): string {
  const blocks: string[] = [];

  blocks.push(`<i>Kilde</i>`);
  blocks.push(escapeHtml(data.source?.trim() || "—"));

  blocks.push("");
  blocks.push(`<b>Navn</b>`);
  blocks.push(escapeHtml(data.name.trim()));

  if (data.phone?.trim()) {
    blocks.push("");
    blocks.push(`<b>Telefon</b>`);
    blocks.push(escapeHtml(data.phone.trim()));
  }

  blocks.push("");
  blocks.push(`<b>E-mail</b>`);
  blocks.push(escapeHtml(data.email.trim()));

  if (data.address?.trim()) {
    blocks.push("");
    blocks.push(`<b>Adresse</b>`);
    blocks.push(escapeHtml(data.address.trim()));
  }

  blocks.push("");
  blocks.push(`<b>Besked</b>`);
  if (data.message.trim()) {
    blocks.push(escapeHtmlMultiline(data.message.trim()));
  } else {
    blocks.push(`<i>Ingen besked</i>`);
  }

  return blocks.join("\n");
}

/**
 * Sender kontaktformular til Telegram via /api/telegram (samme mønster som efedra CallBackForm).
 * Miljøvariabler på serveren: TELEGRAM_BOT_TOKEN (eller TELEGRAM_BOT_ID), TELEGRAM_CHAT_ID
 */
export async function sendContactToTelegram(
  payload: ContactTelegramBody,
): Promise<void> {
  const data = buildContactHtml(payload);
  try {
    await axios({
      method: "post",
      url: "/api/telegram",
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: unknown) {
    const msg =
      axios.isAxiosError(err) &&
      err.response?.data &&
      typeof err.response.data === "object" &&
      "error" in err.response.data
        ? String((err.response.data as { error?: string }).error)
        : "Kunne ikke sende beskeden.";
    throw new Error(msg);
  }
}
