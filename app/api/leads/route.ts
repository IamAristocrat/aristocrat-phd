const required = ["name", "email", "phone", "country", "role", "discipline", "stage", "urgency", "investment", "summary"] as const;

const limits: Record<(typeof required)[number], number> = {
  name: 120,
  email: 254,
  phone: 32,
  country: 80,
  role: 80,
  discipline: 140,
  stage: 100,
  urgency: 80,
  investment: 80,
  summary: 1200,
};

async function verifyTurnstile(token: string, request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;

  const form = new URLSearchParams({ secret, response: token });
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (ip) form.set("remoteip", ip);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return false;
    const result = await response.json() as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Invalid request" }, { status: 415 });
  const payload = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!payload || required.some((key) => typeof payload[key] !== "string" || !String(payload[key]).trim()) || payload.consent !== true) return Response.json({ error: "Invalid enquiry" }, { status: 400 });
  if (required.some((key) => String(payload[key]).trim().length > limits[key])) return Response.json({ error: "Invalid enquiry" }, { status: 400 });
  if (typeof payload.companyWebsite === "string" && payload.companyWebsite.trim()) return Response.json({ ok: true }, { status: 201 });
  if (typeof payload.startedAt !== "number" || Date.now() - payload.startedAt < 2500 || Date.now() - payload.startedAt > 7_200_000) return Response.json({ error: "Please refresh and try again" }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(String(payload.email)) || String(payload.phone).replace(/\D/g, "").length < 7) return Response.json({ error: "Invalid contact details" }, { status: 400 });

  const routerUrl = process.env.LEAD_ROUTER_URL;
  const routerSecret = process.env.LEAD_ROUTER_SECRET;
  if (!routerUrl || !routerSecret || !process.env.TURNSTILE_SECRET_KEY) return Response.json({ error: "Router not configured" }, { status: 503 });
  if (!await verifyTurnstile(String(payload.turnstileToken || ""), request)) return Response.json({ error: "Security check failed" }, { status: 400 });

  const clean = Object.fromEntries(required.map((key) => [key, String(payload[key]).trim()]));
  const requestId = crypto.randomUUID();
  const response = await fetch(routerUrl, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${routerSecret}`, "X-Aristocrat-Request-Id": requestId }, body: JSON.stringify({ operation: "lead", routerSecret, requestId, source: "phd.aristocratresearch.com", receivedAt: new Date().toISOString(), consent: true, ...clean }), signal: AbortSignal.timeout(10_000) });
  if (!response.ok) return Response.json({ error: "Routing failed" }, { status: 502 });
  const routed = await response.json().catch(() => null) as { ok?: boolean; reference?: string } | null;
  if (!routed?.ok) return Response.json({ error: "Routing failed" }, { status: 502 });
  return Response.json({ ok: true, reference: routed.reference || requestId }, { status: 201, headers: { "Cache-Control": "no-store" } });
}
