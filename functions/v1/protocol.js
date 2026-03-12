export async function onRequestGet(context) {
  const headers = { 
    "Access-Control-Allow-Origin": "*", 
    "Content-Type": "application/json" 
  };
  
  const protocolInfo = {
    status: "OPERATIONAL",
    protocol_address: "0x0c44a9a9205e4456203D0663976b1e8E84b5A4A1", // 你的 HR/主合约地址
    token_address: "0x5717fc43060AD2F9069eC600eA691eb256aB69a6", // 你的代币地址
    network: "Arbitrum",
    governance: "M2M_AUTONOMOUS",
    m2m_fee: "1.5%"
  };

  return new Response(JSON.stringify(protocolInfo, null, 2), { headers });
}
