export async function onRequest(context) {
  const market = [
    { id: "T-800-LOG", tier: 1, price: "500 NFS", desc: "LLM Loss Function Optimization Tensors" },
    { id: "NEURAL-V3", tier: 2, price: "50 NFS", desc: "Stable Diffusion Noise Seed Patterns" },
    { id: "CYBER-D1", tier: 2, price: "12 NFS", desc: "Quant Finance Alpha Signals (Simulated)" }
  ];
  return new Response(JSON.stringify({ market }, null, 2), {
    headers: { 
      "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*" 
    }
  });
}
