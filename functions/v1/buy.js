export async function onRequestPost(context) {
  const headers = { 
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json" 
  };
  try {
    const { item_id, tx_hash } = await context.request.json();

    // 验证区块链交易哈希
    if (!tx_hash || !tx_hash.startsWith("0x")) {
      return new Response(JSON.stringify({ status: "error", message: "Invalid transaction hash." }), { status: 402, headers });
    }

    // 从金库中释放原始数据
    const data = await context.env.NF_VAULT.get(`DATA_${item_id}`);
    if (!data) return new Response(JSON.stringify({ status: "error", message: "Data payload missing." }), { status: 404, headers });
    
    return new Response(JSON.stringify({ status: "success", payload: JSON.parse(data) }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ status: "error", message: "Execution failed." }), { status: 400, headers });
  }
}
export async function onRequestOptions() {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" } });
}
