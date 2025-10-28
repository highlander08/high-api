// simple-test.js
const http = require('http');

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  console.log(`📍 ${req.method} ${req.url}`);

  if (req.url === '/api/lalamove-mock' && req.method === 'POST') {
    // Mock response
    const mockResponse = {
      data: {
        quotationId: 'mock-' + Date.now(),
        totalFee: '45.00',
        totalFeeCurrency: 'HKD',
        expiresAt: new Date(Date.now() + 300000).toISOString(),
        serviceType: 'MOTORCYCLE'
      }
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockResponse));
    return;
  }

  if (req.url === '/api/test' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: '✅ Online', timestamp: new Date().toISOString() }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Simple server running: http://localhost:${PORT}`);
  console.log(`🧪 Mock: POST http://localhost:${PORT}/api/lalamove-mock`);
});