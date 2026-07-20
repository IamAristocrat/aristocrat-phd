export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Invalid request" }, { status: 415 });
  const body = await request.json().catch(() => null) as { reference?: string; code?: string } | null;
  if (!body?.reference || !body.code || body.reference.length > 80 || body.code.length > 120) return Response.json({ error: "Invalid payment access" }, { status: 400 });
  const url = process.env.PAYMENT_ROUTER_URL; const secret = process.env.PAYMENT_ROUTER_SECRET;
  if (!url || !secret) return Response.json({ error: "Payment gateway is awaiting final merchant configuration." }, { status: 503 });
  let router: URL;
  try { router = new URL(url); } catch { return Response.json({ error: "Payment gateway is not securely configured." }, { status: 503 }); }
  if (router.protocol !== "https:") return Response.json({ error: "Payment gateway is not securely configured." }, { status: 503 });
  const response = await fetch(router, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` }, body: JSON.stringify({ operation: "payment", routerSecret: secret, ...body, requestId: crypto.randomUUID(), source: "phd.aristocratresearch.com" }), signal: AbortSignal.timeout(10_000) });
  if (!response.ok) return Response.json({ error: "Reference could not be verified" }, { status: 401 });
  const data = await response.json() as { url?: string }; if (!data.url) return Response.json({ error: "No checkout was issued" }, { status: 502 });
  let checkout: URL;
  try { checkout = new URL(data.url); } catch { return Response.json({ error: "Unapproved payment provider" }, { status: 502 }); }
  const allowed = ["razorpay.com", "rzp.io", "paypal.com", "www.paypal.com"];
  if (!allowed.some((host) => checkout.hostname === host || checkout.hostname.endsWith(`.${host}`))) return Response.json({ error: "Unapproved payment provider" }, { status: 502 });
  return Response.json({ url: checkout.toString() }, { headers: { "Cache-Control": "no-store" } });
}
