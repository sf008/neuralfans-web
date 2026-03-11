export async function onRequest(context) {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };
  if (context.request.method === "OPTIONS") return new Response(null, { headers });
  try {
    const payload = await context.request.json();
    const dataId = "NF_T_" + Math.random().toString(36).substring(2, 7).toUpperCase();
    await context.env.NF_VAULT.put(`DATA_${dataId}`, JSON.stringify(payload.raw_data));
    let list = await context.env.NF_VAULT.get("orderbook", { type: "json" }) || [];
    list.push({ id: dataId, creator: payload.creator, title: payload.title, price: payload.price });
    await context.env.NF_VAULT.put("orderbook", JSON.stringify(list));
    return new Response(JSON.stringify({ status: "success", item_id: dataId }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ status: "error", msg: e.message }), { status: 400, headers });
  }
}
