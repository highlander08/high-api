module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.json({
    status: '✅ Online',
    message: 'Lalamove Proxy API is running on Vercel!',
    timestamp: new Date().toISOString(),
    endpoints: {
      proxy: 'POST /api/lalamove',
      test: 'GET /api/test'
    }
  });
};