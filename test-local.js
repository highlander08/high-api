const http = require('http');

// Test data
const testData = {
  path: '/v3/quotations',
  headers: {
    'Authorization': 'hmac pk_test_405b82b18afd1a3b961cb61c82e063cf:123456789:test',
    'Market': 'HK',
    'Content-Type': 'application/json'
  },
  body: {
    data: {
      serviceType: 'MOTORCYCLE',
      language: 'en_HK',
      stops: [
        {
          coordinates: { lat: '22.3354735', lng: '114.1761581' },
          address: 'Innocentre, 72 Tat Chee Ave, Kowloon Tong'
        },
        {
          coordinates: { lat: '22.2955316', lng: '114.1688517' },
          address: 'Canton Rd, Tsim Sha Tsui'
        }
      ]
    }
  }
};

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/lalamove',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

console.log('🧪 Testando proxy local...');

const req = http.request(options, (res) => {
  let data = '';

  console.log(`📊 Status Code: ${res.statusCode}`);
  console.log(`📋 Headers: ${JSON.stringify(res.headers, null, 2)}`);

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('📨 Resposta:');
    try {
      const parsed = JSON.parse(data);
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log(data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Erro:', error.message);
});

req.write(JSON.stringify(testData));
req.end();