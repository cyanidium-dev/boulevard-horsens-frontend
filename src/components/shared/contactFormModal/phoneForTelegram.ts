/** Sørger for +45 hvis brugeren kun indtaster nationale cifre. */
export function phoneForTelegram(raw: string): string {
  const t = raw.trim();
  if (!t) return t;
  if (t.startsWith("+")) return t.replace(/\s+/g, " ").trim();
  const digits = t.replace(/\D/g, "");
  if (digits.length >= 8) {
    return `+45 ${digits}`;
  }
  return t;
}
