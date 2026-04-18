import axios from "axios";

import type { ContactTelegramBody } from "@/types/contactTelegram";

export type { ContactTelegramBody };

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** HTML-besked som i efedra CallBackForm — sendes som JSON-streng til /api/telegram */
function buildContactHtml(data: ContactTelegramBody): string {
  const parts: string[] = [`<b>Kontakt os</b>`];
  if (data.source?.trim()) {
    parts.push(`<b>Kilde:</b> ${escapeHtml(data.source.trim())}`);
  }
  parts.push(`<b>Navn:</b> ${escapeHtml(data.name.trim())}`);
  if (data.phone?.trim()) {
    parts.push(`<b>Telefon:</b> ${escapeHtml(data.phone.trim())}`);
  }
  parts.push(`<b>E-mail:</b> ${escapeHtml(data.email.trim())}`);
  if (data.address?.trim()) {
    parts.push(`<b>Adresse:</b> ${escapeHtml(data.address.trim())}`);
  }
  const body = data.message.trim()
    ? escapeHtml(data.message.trim())
    : "<i>(ingen besked)</i>";
  parts.push("", `<b>Besked:</b>`, body);
  return parts.join("\n");
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
