import type { ContactTelegramBody } from "@/types/contactTelegram";

export type { ContactTelegramBody };

/**
 * Sender kontaktformular til Telegram via server route (token forbliver på serveren).
 * Sæt miljøvariabler: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 */
export async function sendContactToTelegram(
  payload: ContactTelegramBody,
): Promise<void> {
  const res = await fetch("/api/contact/telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as { error?: string };

  if (!res.ok) {
    throw new Error(data.error ?? "Kunne ikke sende beskeden.");
  }
}
