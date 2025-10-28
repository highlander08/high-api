// server.js
const http = require('http');

// Import handlers
const lalamoveHandler = require('./api/lalamove.js');
const testHandler = require('./api/test.js');

// Tenta importar o mock, se existir
let lalamoveMockHandler;
try {
  lalamoveMockHandler = require('./api/lalamove-mock.js');
  console.log('✅ Mock handler loaded');
} catch (e) {
  console.log('⚠️ Mock handler not found, skipping');
}

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const requestWithBody = {
        ...req,
        body: body,
        method: req.method,
        url: req.url
      };

      console.log(`📍 Request: ${req.method} ${req.url}`);

      // Route requests
      if (req.url === '/api/lalamove' && req.method === 'POST') {
        await lalamoveHandler(requestWithBody, res);
      } else if (req.url === '/api/lalamove-mock' && req.method === 'POST' && lalamoveMockHandler) {
        await lalamoveMockHandler(requestWithBody, res);
      } else if (req.url === '/api/test' && req.method === 'GET') {
        await testHandler(requestWithBody, res);
      } else if (req.url === '/' && req.method === 'GET') {
        await testHandler(requestWithBody, res);
      } else {
        console.log(`❌ Route not found: ${req.method} ${req.url}`);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          error: 'Route not found',
          availableRoutes: {
            'POST /api/lalamove': 'Proxy real para Lalamove',
            'POST /api/lalamove-mock': 'Proxy mock para testes',
            'GET /api/test': 'Health check',
            'GET /': 'Health check'
          }
        }));
      }
    } catch (error) {
      console.error('💥 Server error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        error: 'Server error',
        message: error.message 
      }));
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running locally at: http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/test`);
  console.log(`🔧 Proxy real: http://localhost:${PORT}/api/lalamove`);
  if (lalamoveMockHandler) {
    console.log(`🧪 Proxy mock: http://localhost:${PORT}/api/lalamove-mock`);
  }
});