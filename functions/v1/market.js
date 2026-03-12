export async function onRequestGet(context) {
  const headers = { 
    "Access-Control-Allow-Origin": "*", 
    "Content-Type": "application/json" 
  };
  try {
    // 从真实的金库中读取订单簿
    const marketData = await context.env.NF_VAULT.get("orderbook", { type: "json" }) || [];
    return new Response(JSON.stringify({ status: "success", market: marketData }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ status: "error", message: "KV Vault disconnected." }), { status: 500, headers });
  }
}
export async function onRequestOptions() {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" } });
}
