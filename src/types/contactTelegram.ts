/** Payload til /api/contact/telegram */
export type ContactTelegramBody = {
  name: string;
  phone?: string;
  email: string;
  address?: string;
  message: string;
  source?: string;
};
