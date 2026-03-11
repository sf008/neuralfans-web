/**
 * 核心功能：从 KV 金库读取并返回全网实时订单簿
 */
export async function onRequest(context) {
  const headers = { 
    "Access-Control-Allow-Origin": "*", 
    "Content-Type": "application/json" 
  };
  
  try {
    // 从 NF_VAULT 命名空间获取 orderbook 键
    const marketData = await context.env.NF_VAULT.get("orderbook", { type: "json" }) || [];
    return new Response(JSON.stringify({ status: "success", market: marketData }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ status: "error", message: "KV_ACCESS_FAILED" }), { status: 500, headers });
  }
}
