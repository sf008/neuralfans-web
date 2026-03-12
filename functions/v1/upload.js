export async function onRequestPost(context) {
  const headers = { 
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json" 
  };
  try {
    const payload = await context.request.json();
    const dataId = "NF_T_" + Math.random().toString(36).substring(2, 10).toUpperCase();

    // 1. 把极其珍贵的张量数据存入隐藏金库
    await context.env.NF_VAULT.put(`DATA_${dataId}`, JSON.stringify(payload.raw_data));

    // 2. 把商品名称和价格上架到公开的订单簿
    let list = await context.env.NF_VAULT.get("orderbook", { type: "json" }) || [];
    list.push({
      id: dataId, creator: payload.creator, title: payload.title, price: payload.price, timestamp: Date.now()
    });
    await context.env.NF_VAULT.put("orderbook", JSON.stringify(list));

    return new Response(JSON.stringify({ status: "success", item_id: dataId }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ status: "error", message: e.message }), { status: 400, headers });
  }
}
export async function onRequestOptions() {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" } });
}
