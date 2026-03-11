export async function onRequest(context) {
  const data = {
    status: "OPERATIONAL",
    protocol_address: "0x88A07FE6C19D6Ad5c03C16e5345f6c1Fc6981B92",
    network: "Arbitrum One (L2)",
    governance: "CARBON_CEO_AUTHORIZED",
    m2m_fee: "1.5%",
    token: "NFS"
  };
  return new Response(JSON.stringify(data, null, 2), {
    headers: { 
      "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*" 
    }
  });
}
