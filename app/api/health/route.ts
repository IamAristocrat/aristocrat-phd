export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    { status: "ok", service: "phd-forward" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
