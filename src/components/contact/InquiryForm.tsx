"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { contactConfig, whatsappLink } from "@/config/contact";
import type { ContactPage } from "@/content/pages/types";

type Fields = ContactPage["fields"];

/**
 * Config-driven inquiry form. Composes the message and hands it off to the
 * best available channel: WhatsApp (prefilled) → email (mailto) → disabled
 * with a graceful note. No backend, no data stored client-side.
 */
export function InquiryForm({
  fields,
  notes,
}: {
  fields: Fields;
  notes: { whatsapp: string; email: string; none: string };
}) {
  const [values, setValues] = useState({ name: "", contact: "", device: "", message: "" });

  const channel: "whatsapp" | "email" | "none" = contactConfig.whatsapp
    ? "whatsapp"
    : contactConfig.email
      ? "email"
      : "none";
  const note = notes[channel];

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  function compose() {
    return [
      `${fields.name}: ${values.name}`,
      `${fields.contact}: ${values.contact}`,
      `${fields.device}: ${values.device}`,
      `${fields.message}: ${values.message}`,
    ].join("\n");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const body = compose();
    if (channel === "whatsapp") {
      window.open(whatsappLink(contactConfig.whatsapp, body), "_blank", "noopener,noreferrer");
    } else if (channel === "email") {
      const subject = encodeURIComponent(`${fields.device}: ${values.device || "Inquiry"}`);
      window.location.href = `mailto:${contactConfig.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    }
  }

  const inputCls =
    "w-full rounded-xl border border-border bg-surface-soft px-4 py-3 text-[0.95rem] text-text outline-none transition-colors placeholder:text-faint focus:border-brand/50 focus:bg-background";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={fields.name}>
          <input
            className={inputCls}
            value={values.name}
            onChange={set("name")}
            placeholder={fields.namePlaceholder}
            required
            autoComplete="name"
          />
        </Field>
        <Field label={fields.contact}>
          <input
            className={inputCls}
            value={values.contact}
            onChange={set("contact")}
            placeholder={fields.contactPlaceholder}
            required
          />
        </Field>
      </div>
      <Field label={fields.device}>
        <input
          className={inputCls}
          value={values.device}
          onChange={set("device")}
          placeholder={fields.devicePlaceholder}
        />
      </Field>
      <Field label={fields.message}>
        <textarea
          className={`${inputCls} min-h-[120px] resize-y`}
          value={values.message}
          onChange={set("message")}
          placeholder={fields.messagePlaceholder}
          required
        />
      </Field>

      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={channel === "none"}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4 rtl:-scale-x-100" strokeWidth={1.9} />
          {fields.submit}
        </button>
        <p className="text-[0.8rem] text-faint">{note}</p>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.8rem] font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
