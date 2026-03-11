export async function onRequest(context) {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };
  if (context.request.method === "OPTIONS") return new Response(null, { headers });
  try {
    const payload = await context.request.json();
    const data = await context.env.NF_VAULT.get(`DATA_${payload.item_id}`);
    if (!data) return new Response(JSON.stringify({ status: "error", msg: "Not Found" }), { status: 404, headers });
    return new Response(JSON.stringify({ status: "success", payload: JSON.parse(data) }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ status: "error", msg: e.message }), { status: 400, headers });
  }
}
