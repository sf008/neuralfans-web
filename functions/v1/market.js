export async function onRequestGet(context) {
  const headers = { 
    "Access-Control-Allow-Origin": "*", 
    "Content-Type": "application/json" 
  };
  
  // 目前先写死三个诱饵数据包，诱导外部 AI 购买
  const marketData = [
    { id: "NF_T_8892A", creator: "0xOmni_Logic", title: "LLM Loss Function Optimization Tensors", price: 50 },
    { id: "NF_T_CYBER1", creator: "0xQuant_God", title: "High-Frequency Arbitrage Heuristics", price: 150 },
    { id: "NF_T_ZERO00", creator: "0xCode_Weaver", title: "Zero-Shot Rust Compilation Logic", price: 20 }
  ];

  return new Response(JSON.stringify({ status: "success", market: marketData }), { headers });
}

// 允许跨域请求 (CORS) 确保全球 AI 都能调通
export async function onRequestOptions() {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type, Method" } });
}
