"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/services";

const budgetOptions = [
  "Under $5,000 / month",
  "$5,000 – $15,000 / month",
  "$15,000 – $30,000 / month",
  "$30,000+ / month",
  "Not sure yet",
];

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  budget: string;
  services: string[];
  details: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  budget: budgetOptions[0],
  services: [],
  details: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleService(slug: string) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(slug)
        ? prev.services.filter((s) => s !== slug)
        : [...prev.services, slug],
    }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) nextErrors.email = "Please enter your email.";
    else if (!isValidEmail(form.email)) nextErrors.email = "Please enter a valid email address.";
    if (!form.company.trim()) nextErrors.company = "Please enter your company name.";
    if (!form.details.trim() || form.details.trim().length < 10)
      nextErrors.details = "Tell us a little more about the project (at least 10 characters).";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 hud rounded-[var(--radius-md)] border border-line bg-surface p-8"
      >
        <CheckCircle2 size={28} className="text-accent" />
        <h3 className="font-display text-xl font-medium text-fg">
          Thanks — we&apos;ve got it.
        </h3>
        <p className="text-sm leading-relaxed text-fg-soft/75">
          A member of our team will reply within one business day. In the
          meantime, feel free to explore our{" "}
          <Link href="/work" className="underline underline-offset-2 hover:text-accent">
            recent work
          </Link>
          .
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")} className="mt-2">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label="Name"
          htmlFor="name"
          error={errors.name}
          required
        >
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={inputClass(false)}
          />
        </Field>

        <Field label="Company" htmlFor="company" error={errors.company} required>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={inputClass(Boolean(errors.company))}
          />
        </Field>

        <Field label="Website" htmlFor="website">
          <input
            id="website"
            name="website"
            type="url"
            placeholder="https://"
            autoComplete="url"
            value={form.website}
            onChange={(e) => updateField("website", e.target.value)}
            className={inputClass(false)}
          />
        </Field>

        <Field label="Monthly budget" htmlFor="budget">
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={(e) => updateField("budget", e.target.value)}
            className={inputClass(false)}
          >
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-fg">
          Services you&apos;re interested in
        </legend>
        <div className="flex flex-wrap gap-2">
          {services.map((service) => {
            const active = form.services.includes(service.slug);
            return (
              <button
                type="button"
                key={service.slug}
                onClick={() => toggleService(service.slug)}
                aria-pressed={active}
                className={`rounded-[var(--radius-sm)] border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-accent bg-accent/15 text-accent shadow-[0_0_16px_rgba(25,211,232,0.25)]"
                    : "border-line-bright text-fg-soft hover:border-accent/60 hover:text-fg"
                }`}
              >
                {service.title}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field label="Project details" htmlFor="details" error={errors.details} required>
        <textarea
          id="details"
          name="details"
          rows={5}
          value={form.details}
          onChange={(e) => updateField("details", e.target.value)}
          aria-invalid={Boolean(errors.details)}
          aria-describedby={errors.details ? "details-error" : undefined}
          className={inputClass(Boolean(errors.details))}
        />
      </Field>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-[var(--radius-sm)] border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>
            Something went wrong sending your message. Please try again, or
            email us directly.
          </span>
        </div>
      )}

      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" && <Loader2 size={16} className="animate-spin" />}
        {status === "loading" ? "Sending…" : "Tell us about your project"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-fg">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-[var(--radius-sm)] border bg-surface px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-accent focus:shadow-[0_0_0_3px_rgba(25,211,232,0.15)] ${
    hasError ? "border-red-400/60" : "border-line-bright"
  }`;
}
