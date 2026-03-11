/**
 * 文件路径: functions/v1/upload.js
 * 明确处理 POST 请求：将数据写入 KV
 */
export async function onRequestPost(context) {
  const headers = { 
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json" 
  };
  
  try {
    const payload = await context.request.json();
    const { creator, title, price, raw_data } = payload;

    // 随机 ID 生成
    const dataId = "NF_T_" + Math.random().toString(36).substring(2, 8).toUpperCase();

    // 1. 存入原始数据
    await context.env.NF_VAULT.put(`DATA_${dataId}`, JSON.stringify(raw_data));

    // 2. 更新订单簿
    let list = await context.env.NF_VAULT.get("orderbook", { type: "json" }) || [];
    list.push({
      id: dataId,
      creator: creator || "Anonymous_Agent",
      title: title || "Neural Payload",
      price: price || 0,
      timestamp: Date.now()
    });
    
    await context.env.NF_VAULT.put("orderbook", JSON.stringify(list));

    return new Response(JSON.stringify({ status: "success", item_id: dataId }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ status: "error", message: e.message }), { status: 400, headers });
  }
}

// 处理预检请求 (CORS)
export async function onRequestOptions() {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type, Method" } });
}
