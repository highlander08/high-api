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