import { NextResponse } from "next/server";

/**
 * ============================================================
 * CONTACT FORM API ROUTE
 * ============================================================
 * This route validates and accepts contact form submissions.
 * It is intentionally provider-agnostic: swap in Resend,
 * Formspree, HubSpot, or a custom mailer by implementing
 * `deliverSubmission` below. No email provider is called yet,
 * so this works out of the box with zero configuration.
 *
 * TO CONNECT RESEND (example):
 *   1. `npm install resend`
 *   2. Add RESEND_API_KEY to your environment (see .env.example)
 *   3. Replace the body of deliverSubmission with a real send call
 * ============================================================
 */

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  company: string;
  website?: string;
  budget?: string;
  services?: string[];
  details: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(payload: Partial<ContactSubmission>): string | null {
  if (!payload.name || !payload.name.trim()) return "Name is required.";
  if (!payload.email || !isValidEmail(payload.email)) return "A valid email is required.";
  if (!payload.company || !payload.company.trim()) return "Company is required.";
  if (!payload.details || payload.details.trim().length < 10)
    return "Project details must be at least 10 characters.";
  return null;
}

function sanitize(value: string) {
  return value.replace(/[<>]/g, "").trim().slice(0, 5000);
}

async function deliverSubmission(submission: ContactSubmission) {
  // TODO: replace with a real provider call, e.g.:
  //
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "Northfield Website <noreply@yourdomain.com>",
  //   to: process.env.CONTACT_EMAIL_TO ?? "hello@northfield.agency",
  //   subject: `New project inquiry from ${submission.name}`,
  //   text: JSON.stringify(submission, null, 2),
  // });
  //
  // For now, log server-side so submissions are visible during development.
  console.log("New contact submission:", submission);
}

export async function POST(request: Request) {
  let payload: Partial<ContactSubmission>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const submission: ContactSubmission = {
    name: sanitize(payload.name!),
    email: sanitize(payload.email!),
    phone: payload.phone ? sanitize(payload.phone) : undefined,
    company: sanitize(payload.company!),
    website: payload.website ? sanitize(payload.website) : undefined,
    budget: payload.budget ? sanitize(payload.budget) : undefined,
    services: Array.isArray(payload.services) ? payload.services.slice(0, 30) : undefined,
    details: sanitize(payload.details!),
  };

  try {
    await deliverSubmission(submission);
  } catch (error) {
    console.error("Failed to deliver contact submission", error);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
