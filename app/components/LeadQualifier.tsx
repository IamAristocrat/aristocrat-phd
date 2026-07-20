"use client";

import { FormEvent, useState } from "react";
import Script from "next/script";

type FormState = {
  name: string; email: string; phone: string; country: string; role: string; discipline: string;
  stage: string; urgency: string; investment: string; summary: string; consent: boolean;
};

const initial: FormState = { name: "", email: "", phone: "", country: "India", role: "PhD scholar", discipline: "", stage: "", urgency: "", investment: "", summary: "", consent: false };

export default function LeadQualifier({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "fallback">("idle");
  const [failureMessage, setFailureMessage] = useState("");
  const [startedAt] = useState(() => Date.now());

  function update(name: keyof FormState, value: string | boolean) { setForm((current) => ({ ...current, [name]: value })); }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); setFailureMessage("");
    const data = new FormData(event.currentTarget);
    const turnstileToken = String(data.get("cf-turnstile-response") || "");
    const companyWebsite = String(data.get("companyWebsite") || "");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, turnstileToken, companyWebsite, startedAt }) });
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(result.error || "The secure form is temporarily unavailable.");
      window.location.href = "/start/received";
    } catch (error) {
      setFailureMessage(error instanceof Error ? error.message : "The secure form is temporarily unavailable.");
      setStatus("fallback");
    }
  }

  const message = encodeURIComponent(`Hello Aristocrat Research. I completed the PhD Forward enquiry. Name: ${form.name}. Role: ${form.role}. Discipline: ${form.discipline}. Stage: ${form.stage}. Timeline: ${form.urgency}. Investment range: ${form.investment}. Need: ${form.summary}`);

  return <form className="lead-form" onSubmit={submit}>
    {turnstileSiteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />}
    <label className="form-trap" aria-hidden="true">Company website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
    <div className="form-grid">
      <label>Full name<input required value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" /></label>
      <label>Email<input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" /></label>
      <label>WhatsApp number<input required value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" placeholder="Include country code" /></label>
      <label>Country<input required value={form.country} onChange={(e) => update("country", e.target.value)} autoComplete="country-name" /></label>
      <label>Your role<select value={form.role} onChange={(e) => update("role", e.target.value)}><option>PhD scholar</option><option>Professor or supervisor</option><option>Institution representative</option><option>Family or sponsor</option></select></label>
      <label>Discipline<input required value={form.discipline} onChange={(e) => update("discipline", e.target.value)} placeholder="e.g. Engineering, Management, English" /></label>
      <label>Current stage<select required value={form.stage} onChange={(e) => update("stage", e.target.value)}><option value="">Choose one</option><option>Topic or proposal</option><option>Methodology or data</option><option>Thesis chapters</option><option>Paper writing or submission</option><option>Reviewer revisions</option><option>Viva preparation</option><option>Book or chapter</option></select></label>
      <label>Working timeline<select required value={form.urgency} onChange={(e) => update("urgency", e.target.value)}><option value="">Choose one</option><option>Within 15 days</option><option>Within 30 days</option><option>Within 3 months</option><option>Planning ahead</option></select></label>
      <label className="wide">Planned milestone investment<select required value={form.investment} onChange={(e) => update("investment", e.target.value)}><option value="">Choose a range</option><option>Below ₹20,000</option><option>₹20,000–₹30,000</option><option>₹30,000–₹60,000</option><option>Above ₹60,000</option><option>Prefer to discuss</option></select><small>This is a qualification range, not a public price or quotation.</small></label>
      <label className="wide">What is stuck?<textarea required maxLength={1200} value={form.summary} onChange={(e) => update("summary", e.target.value)} placeholder="Describe the immediate block, the outcome you need and any fixed deadline. Do not paste confidential research or upload files here." /></label>
    </div>
    {turnstileSiteKey && <div className="turnstile-wrap"><div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" /></div>}
    <label className="consent-check"><input required type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} /><span>I have read the <a href="/privacy">Privacy Notice</a> and consent to contact by email and WhatsApp about this enquiry. I understand that no service or outcome is guaranteed.</span></label>
    <button className="button button-primary metallic-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending securely…" : "Request my confidential diagnosis →"}</button>
    {status === "fallback" && <div className="router-fallback" role="alert"><p>{failureMessage} No information was stored. You can retry or continue through WhatsApp:</p><a className="button button-secondary" href={`https://wa.me/919894595035?text=${message}`} target="_blank" rel="noreferrer">Send through WhatsApp ↗</a></div>}
  </form>;
}
