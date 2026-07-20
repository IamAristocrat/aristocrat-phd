"use client";

import { FormEvent, useState } from "react";

export default function SecureGateway({ kind }: { kind: "payment" | "workspace" }) {
  const [reference, setReference] = useState(""); const [code, setCode] = useState(""); const [message, setMessage] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault(); setMessage("Verifying…");
    const endpoint = kind === "payment" ? "/api/payment-session" : "/api/client-session";
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reference, code }) });
      const data = await response.json() as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error || "Gateway unavailable");
      window.location.assign(data.url);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Gateway unavailable"); }
  }
  return <form className="gateway-form" onSubmit={submit}><label>{kind === "payment" ? "Quotation or invoice reference" : "Client reference"}<input required value={reference} onChange={(e) => setReference(e.target.value)} autoComplete="off" /></label><label>One-time access code<input required type="password" value={code} onChange={(e) => setCode(e.target.value)} autoComplete="one-time-code" /></label><button className="button button-primary metallic-button" type="submit">{kind === "payment" ? "Open verified payment →" : "Open secure workspace →"}</button>{message && <p role="status">{message}</p>}</form>;
}
