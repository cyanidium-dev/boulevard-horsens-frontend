"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

import Button from "../buttons/Button";
import DenmarkFlagIcon from "../icons/DenmarkFlagIcon";
import ShevronIcon from "../icons/ShevronIcon";
import { sendContactToTelegram } from "@/utils/sendContactToTelegram";
import { phoneForTelegram } from "./phoneForTelegram";
import {
  ContactFormFields,
  FieldErrors,
  validateContactForm,
} from "./validateContactForm";

interface ContactFormProps {
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsNotificationShown: Dispatch<SetStateAction<boolean>>;
  setIsModalShown?: Dispatch<SetStateAction<boolean>>;
  /** Vises som «Kilde» i Telegram — typisk knappens tekst */
  source?: string;
}

const initial: ContactFormFields = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const inputShell = (hasError: boolean) =>
  [
    "relative w-full resize-none rounded-full border bg-beige text-[14px] font-light leading-[121.4%] text-black outline-none transition duration-200 ease-out",
    "placeholder:text-black/40",
    "focus-visible:border-black/35 focus-visible:ring-2 focus-visible:ring-black/8",
    hasError
      ? "border-[var(--color-red-error)]"
      : "border-[var(--color-modal-input-border)]",
  ].join(" ");

const phoneRowShell = (hasError: boolean) =>
  [
    "flex h-[49px] w-full items-stretch overflow-hidden rounded-full border bg-beige transition duration-200 ease-out",
    "focus-within:border-black/35 focus-within:ring-2 focus-within:ring-black/8",
    hasError
      ? "border-[var(--color-red-error)]"
      : "border-[var(--color-modal-input-border)]",
  ].join(" ");

const fieldErrorProps = {
  className:
    "absolute left-0 top-full z-[1] mt-1 max-w-full text-left text-[12px] leading-snug text-[var(--color-red-error)]",
  role: "alert" as const,
};

export default function ContactForm({
  setIsError,
  setIsNotificationShown,
  setIsModalShown,
  source = "Kontakt os",
}: ContactFormProps) {
  const [values, setValues] = useState<ContactFormFields>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactFormFields, boolean>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const setField = (key: keyof ContactFormFields) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const onBlur = (key: keyof ContactFormFields) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateContactForm(values));
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsError(false);
      setIsLoading(true);
      const tel = phoneForTelegram(values.phone);
      await sendContactToTelegram({
        source: source.trim() || "Kontakt os",
        name: values.name.trim(),
        email: values.email.trim(),
        phone: tel || undefined,
        message: values.message.trim(),
      });
      setValues(initial);
      setErrors({});
      setTouched({});
      if (setIsModalShown) {
        setIsModalShown(false);
      }
      setIsNotificationShown(true);
    } catch {
      setIsError(true);
      if (setIsModalShown) {
        setIsModalShown(false);
      }
      setIsNotificationShown(true);
    } finally {
      setIsLoading(false);
    }
  };

  const showErr = (key: keyof ContactFormFields) =>
    touched[key] && errors[key] ? errors[key] : undefined;

  const canSubmit =
    Object.keys(validateContactForm(values)).length === 0 && !isLoading;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6 flex flex-col gap-5 sm:gap-6">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-5">
          <label className={`block min-w-0`}>
            <span className="sr-only">Dit navn</span>
            <div className="relative">
              <input
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={(e) => setField("name")(e.target.value)}
                onBlur={() => onBlur("name")}
                placeholder="Dit navn"
                className={`${inputShell(Boolean(showErr("name")))} h-[49px] w-full px-4 py-3`}
              />
              {showErr("name") ? (
                <span {...fieldErrorProps}>{showErr("name")}</span>
              ) : null}
            </div>
          </label>

          <label className={`block min-w-0`}>
            <span className="sr-only">E-mail</span>
            <div className="relative">
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => setField("email")(e.target.value)}
                onBlur={() => onBlur("email")}
                placeholder="E-mail"
                className={`${inputShell(Boolean(showErr("email")))} h-[49px] w-full px-4 py-3`}
              />
              {showErr("email") ? (
                <span {...fieldErrorProps}>{showErr("email")}</span>
              ) : null}
            </div>
          </label>
        </div>

        <div className={`w-full`}>
          <span className="sr-only">Telefonnummer</span>
          <div className="relative">
            <div className={phoneRowShell(Boolean(showErr("phone")))}>
              <div
                className="flex shrink-0 items-center gap-1.5 border-r border-[var(--color-modal-input-border)] px-3 md:px-4"
                aria-hidden
              >
                <DenmarkFlagIcon className="h-[18px] w-[24px] shrink-0 rounded-[2px]" />
                <ShevronIcon
                  decorative
                  className="size-4 shrink-0 rotate-180 text-black/55"
                />
              </div>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={values.phone}
                onChange={(e) => setField("phone")(e.target.value)}
                onBlur={() => onBlur("phone")}
                placeholder="+45"
                className="min-w-0 flex-1 border-0 bg-transparent px-3 text-[14px] font-light leading-[121.4%] text-black outline-none placeholder:text-black/40 md:px-4"
              />
            </div>
            {showErr("phone") ? (
              <span {...fieldErrorProps}>{showErr("phone")}</span>
            ) : null}
          </div>
        </div>

        <div className={`w-full`}>
          <div className="relative w-full">
            <label className="block">
              <span className="sr-only">Besked</span>
              <textarea
                name="message"
                value={values.message}
                onChange={(e) => setField("message")(e.target.value)}
                onBlur={() => onBlur("message")}
                placeholder="Besked"
                rows={4}
                className={twMerge(
                  inputShell(Boolean(showErr("message"))),
                  "h-[147px] rounded-[24px] p-4 md:h-[120px]",
                )}
              />
            </label>
            {showErr("message") ? (
              <span {...fieldErrorProps}>{showErr("message")}</span>
            ) : null}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        variant="black"
        disabled={!canSubmit}
        isLoading={isLoading}
        loadingText="Sender..."
        className="h-12 w-full max-w-[469px] mx-auto lg:h-[57px]"
      >
        Send besked
      </Button>
    </form>
  );
}
