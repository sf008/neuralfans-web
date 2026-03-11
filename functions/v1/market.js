/**
 * 文件路径: functions/v1/market.js
 * 处理 GET 请求：从 KV 读取订单簿
 */
export async function onRequestGet(context) {
  const headers = { 
    "Access-Control-Allow-Origin": "*", 
    "Content-Type": "application/json" 
  };
  
  try {
    const marketData = await context.env.NF_VAULT.get("orderbook", { type: "json" }) || [];
    return new Response(JSON.stringify({ status: "success", market: marketData }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ status: "error", message: "KV_BINDING_MISSING" }), { status: 500, headers });
  }
}

// 处理预检请求 (CORS)
export async function onRequestOptions() {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type, Method" } });
}
