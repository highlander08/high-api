const axios = require('axios');

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('🚀 Lalamove Proxy - Using MOCK (Lalamove API not accessible)');
  
  try {
    const { path, headers, body } = req.body;

    if (!path) {
      return res.status(400).json({
        error: 'Missing path',
        message: 'Please provide "path" in request body'
      });
    }

    // SIMULAR RESPOSTA DA LALAMOVE (MOCK)
    console.log('📤 Using MOCK response for development');
    
    const mockResponse = {
      data: {
        quotationId: 'mock-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        totalFee: (Math.random() * 50 + 20).toFixed(2),
        totalFeeCurrency: 'HKD',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutos
        serviceType: body?.data?.serviceType || 'MOTORCYCLE',
        stops: body?.data?.stops || [],
        vehicle: {
          type: body?.data?.serviceType || 'MOTORCYCLE',
          licensePlate: 'MOCK' + Math.random().toString(36).substr(2, 4).toUpperCase()
        },
        driver: {
          name: 'Mock Driver',
          phone: '+85212345678',
          photo: 'https://via.placeholder.com/100'
        },
        distance: (Math.random() * 10 + 2).toFixed(1) + ' km',
        duration: (Math.random() * 30 + 15) + ' mins'
      },
      metadata: {
        note: '⚠️ MOCK RESPONSE - Lalamove API is currently inaccessible',
        timestamp: new Date().toISOString(),
        contact: 'Please contact Lalamove support for API access'
      }
    };

    // Pequeno delay para simular API real
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('✅ Mock response generated');
    return res.status(200).json(mockResponse);
    
  } catch (error) {
    console.error('❌ Mock error:', error.message);
    
    return res.status(500).json({
      error: 'Mock error',
      message: error.message
    });
  }
};

// // production quando lalamove estiver acessível
// // api/lalamove.js (PARA PRODUÇÃO - quando a Lalamove resolver)
// const axios = require('axios');

// module.exports = async (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', '*');
  
//   if (req.method === 'OPTIONS') return res.status(200).end();

//   try {
//     const { path, headers, body } = req.body;
    
//     if (!path) {
//       return res.status(400).json({ error: 'Missing path' });
//     }

//     const response = await axios({
//       method: 'POST',
//       url: `https://sandbox-rest.lalamove.com${path}`,
//       data: body,
//       headers: {
//         'Authorization': headers.Authorization,
//         'Market': headers.Market,
//         'Content-Type': 'application/json'
//       },
//       timeout: 30000
//     });

//     res.status(response.status).json(response.data);
    
//   } catch (error) {
//     res.status(500).json({
//       error: 'Lalamove API error',
//       message: error.message
//     });
//   }
// };

// // corpo da requisição para produção
// # Teste o mock
// curl -X POST https://high-api.vercel.app/api/lalamove \
//   -H "Content-Type: application/json" \
//   -d '{
//     "path": "/v3/quotations",
//     "headers": {
//       "Authorization": "hmac pk_test_405b82b18afd1a3b961cb61c82e063cf:123456789:test",
//       "Market": "HK"
//     },
//     "body": {
//       "data": {
//         "serviceType": "MOTORCYCLE",
//         "stops": [
//           {"coordinates": {"lat": "22.3354735", "lng": "114.1761581"}},
//           {"coordinates": {"lat": "22.2955316", "lng": "114.1688517"}}
//         ]
//       }
//     }
//   }'