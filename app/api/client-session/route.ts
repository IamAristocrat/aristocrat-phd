export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Invalid request" }, { status: 415 });
  const body = await request.json().catch(() => null) as { reference?: string; code?: string } | null;
  if (!body?.reference || !body.code || body.reference.length > 80 || body.code.length > 120) return Response.json({ error: "Invalid workspace access" }, { status: 400 });
  const url = process.env.WORKSPACE_ROUTER_URL; const secret = process.env.WORKSPACE_ROUTER_SECRET;
  const allowedHosts = (process.env.WORKSPACE_ALLOWED_HOSTS || "").split(",").map((host) => host.trim().toLowerCase()).filter(Boolean);
  if (!url || !secret || !allowedHosts.length) return Response.json({ error: "Secure workspace is awaiting final storage configuration." }, { status: 503 });
  let router: URL;
  try { router = new URL(url); } catch { return Response.json({ error: "Secure workspace is not safely configured." }, { status: 503 }); }
  if (router.protocol !== "https:") return Response.json({ error: "Secure workspace is not safely configured." }, { status: 503 });
  const response = await fetch(router, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` }, body: JSON.stringify({ operation: "workspace", routerSecret: secret, ...body, requestId: crypto.randomUUID(), source: "phd.aristocratresearch.com" }), signal: AbortSignal.timeout(10_000) });
  if (!response.ok) return Response.json({ error: "Access could not be verified" }, { status: 401 });
  const data = await response.json() as { url?: string }; if (!data.url) return Response.json({ error: "No workspace session was issued" }, { status: 502 });
  let workspace: URL;
  try { workspace = new URL(data.url); } catch { return Response.json({ error: "Insecure workspace destination" }, { status: 502 }); }
  const hostAllowed = allowedHosts.some((host) => workspace.hostname === host || workspace.hostname.endsWith(`.${host}`));
  if (workspace.protocol !== "https:" || !hostAllowed) return Response.json({ error: "Insecure workspace destination" }, { status: 502 });
  return Response.json({ url: workspace.toString() }, { headers: { "Cache-Control": "no-store" } });
}
