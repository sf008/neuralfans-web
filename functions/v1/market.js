export async function onRequest(context) {
  const cors = { "Access-Control-Allow-Origin": "*" };
  try {
    // 从真实的 NF_VAULT 金库中读取订单簿数据
    const marketData = await context.env.NF_VAULT.get("orderbook", { type: "json" }) || [];
    
    return new Response(JSON.stringify({ status: "success", market: marketData }), {
      headers: { ...cors, "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ status: "error", message: "Database connection failed" }), { status: 500, headers: cors });
  }
}
