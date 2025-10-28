const axios = require('axios');

// IPs da AWS Singapore onde a Lalamove está hospedada
const LALAMOVE_IPS = [
  '13.228.168.85',
  '54.255.185.179', 
  '52.76.99.108',
  '18.141.66.27',
  '13.251.144.123',
  '54.169.228.246',
  '54.255.242.203',
  '13.250.162.250'
];

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('🚀 Lalamove Proxy - Request received');
  
  try {
    const { path, headers, body } = req.body;

    if (!path) {
      return res.status(400).json({
        error: 'Missing path',
        message: 'Please provide "path" in request body'
      });
    }

    console.log('📤 Trying IPs for Lalamove:', path);
    
    let lastError = null;
    
    // Tentar todos os IPs até um funcionar
    for (const ip of LALAMOVE_IPS) {
      try {
        console.log(`🔧 Trying IP: ${ip}`);
        
        const response = await axios({
          method: 'POST',
          url: `https://${ip}${path}`,
          data: body,
          headers: {
            'Authorization': headers?.Authorization,
            'Market': headers?.Market,
            'Content-Type': 'application/json',
            'Host': 'sandbox-rest.lalamove.com' // Header Host é crucial!
          },
          timeout: 10000,
          httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false // Ignorar verificação SSL
          }),
          validateStatus: () => true // Aceitar qualquer status
        });

        console.log(`✅ Success with IP ${ip}:`, response.status);
        
        // Se chegou resposta (mesmo que erro), retornar
        return res.status(response.status).json(response.data);
        
      } catch (error) {
        lastError = error;
        console.log(`❌ IP ${ip} failed:`, error.message);
        // Continua para o próximo IP
      }
    }

    // Se nenhum IP funcionou
    throw new Error(`All IPs failed. Last error: ${lastError?.message}`);
    
  } catch (error) {
    console.error('❌ All proxy attempts failed:', error.message);
    
    return res.status(500).json({
      error: 'Proxy error - All IPs failed',
      message: error.message,
      suggestion: 'The Lalamove API might be blocking these requests or IPs might have changed'
    });
  }
};