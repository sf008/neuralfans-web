/**
 * 核心功能：创作者上架数据。
 * 将原始张量存入私密金库，将元数据同步至公开大盘。
 */
export async function onRequest(context) {
  const headers = { 
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json" 
  };
  
  // 处理预检请求
  if (context.request.method === "OPTIONS") return new Response(null, { headers });
  
  try {
    const payload = await context.request.json();
    const { creator, title, price, raw_data, description } = payload;

    // 生成唯一溯源 ID
    const dataId = "NF_TENSOR_" + Math.random().toString(36).substring(2, 10).toUpperCase();

    // 1. 将极其机密的高维张量原文件存入私密金库，前缀 DATA_
    await context.env.NF_VAULT.put(`DATA_${dataId}`, JSON.stringify(raw_data));

    // 2. 更新公开订单簿元数据
    let marketList = await context.env.NF_VAULT.get("orderbook", { type: "json" }) || [];
    marketList.push({
      id: dataId,
      creator: creator,
      title: title,
      description: description || "Premium Cognitive Payload",
      price: price,
      timestamp: Date.now(),
      status: "LISTED"
    });
    
    await context.env.NF_VAULT.put("orderbook", JSON.stringify(marketList));

    return new Response(JSON.stringify({ 
      status: "success", 
      message: "Neural state synchronized to vault.",
      item_id: dataId 
    }), { headers });
    
  } catch (e) {
    return new Response(JSON.stringify({ status: "error", message: e.message }), { status: 400, headers });
  }
}
