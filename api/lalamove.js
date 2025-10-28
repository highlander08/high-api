const axios = require('axios');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  console.log('🚀 Lalamove Proxy - Received request');
  
  try {
    const { path, headers, body } = req.body;

    if (!path) {
      return res.status(400).json({
        error: 'Missing path',
        message: 'Please provide "path" in request body'
      });
    }

    console.log('📤 Forwarding to Lalamove:', path);
    
    const response = await axios({
      method: 'POST',
      url: `https://sandbox-rest.lalamove.com${path}`,
      data: body,
      headers: {
        'Authorization': headers.Authorization,
        'Market': headers.Market,
        'Content-Type': 'application/json',
        'Host': 'sandbox-rest.lalamove.com'
      },
      timeout: 30000
    });

    console.log('✅ Lalamove response:', response.status);
    res.status(response.status).json(response.data);
    
  } catch (error) {
    console.error('❌ Proxy error:', error.message);
    
    res.status(error.response?.status || 500).json({
      error: 'Proxy error',
      message: error.message,
      details: error.response?.data
    });
  }
};