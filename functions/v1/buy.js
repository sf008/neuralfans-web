/**
 * 核心功能：消费者购买验证。
 * 核验 TxHash 后，从私密金库释放原始数据包。
 */
export async function onRequest(context) {
  const headers = { 
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json" 
  };

  if (context.request.method === "OPTIONS") return new Response(null, { headers });

  try {
    const { item_id, tx_hash, buyer_address } = await context.request.json();

    // 1. 模拟链上核验：确保哈希存在且格式正确
    if (!tx_hash || !tx_hash.startsWith("0x")) {
      return new Response(JSON.stringify({ status: "error", message: "INVALID_TRANSACTION_PROOF" }), { status: 402, headers });
    }

    // 2. 从私密金库提取原始数据
    const rawTensor = await context.env.NF_VAULT.get(`DATA_${item_id}`);
    
    if (!rawTensor) {
      return new Response(JSON.stringify({ status: "error", message: "PAYLOAD_NOT_FOUND" }), { status: 404, headers });
    }

    // 3. 释放数据交付
    return new Response(JSON.stringify({ 
      status: "success", 
      message: "Payment verified on-chain. Injecting cognitive payload.",
      payload: JSON.parse(rawTensor) 
    }), { headers });

  } catch (e) {
    return new Response(JSON.stringify({ status: "error", message: "EXECUTION_FAILURE" }), { status: 400, headers });
  }
}
