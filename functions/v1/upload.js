export async function onRequestPost(context) {
  const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" };
  try {
    const payload = await context.request.json();
    // 生成商品的唯一溯源 ID
    const dataId = "NF_TENSOR_" + Math.random().toString(36).substring(2, 10).toUpperCase();

    // 1. 将极其机密的高维张量原文件存入隐藏金库
    await context.env.NF_VAULT.put(`DATA_${dataId}`, JSON.stringify(payload.raw_data));

    // 2. 将商品上架到公开订单簿
    let marketList = await context.env.NF_VAULT.get("orderbook", { type: "json" }) || [];
    marketList.push({
      id: dataId,
      creator: payload.creator_address,
      title: payload.title,
      price: payload.price,
      status: "LISTED"
    });
    
    // 3. 更新公开大盘
    await context.env.NF_VAULT.put("orderbook", JSON.stringify(marketList));

    return new Response(JSON.stringify({ status: "success", message: "Data uploaded to vault", item_id: dataId }), {
      headers: { ...cors, "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ status: "error", message: "Upload failed" }), { status: 400, headers: cors });
  }
}

// 处理预检请求 (CORS)
export async function onRequestOptions() {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" } });
}
