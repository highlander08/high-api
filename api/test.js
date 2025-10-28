module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.json({
    status: '✅ Online',
    message: 'Lalamove Proxy API is running!',
    timestamp: new Date().toISOString(),
    endpoints: {
      'POST /api/lalamove': 'Proxy for Lalamove API',
      'GET /api/test': 'Health check'
    }
  });
};