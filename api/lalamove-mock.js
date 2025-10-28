// api/lalamove-mock.js
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  console.log('🧪 Mock Lalamove - Received request');

  // Simular resposta da Lalamove
  const mockResponse = {
    data: {
      quotationId: 'mock-' + Date.now(),
      totalFee: '45.00',
      totalFeeCurrency: 'HKD',
      expiresAt: new Date(Date.now() + 300000).toISOString(),
      stops: [
        {
          coordinates: { lat: '22.3354735', lng: '114.1761581' },
          address: 'Innocentre, Kowloon Tong'
        },
        {
          coordinates: { lat: '22.2955316', lng: '114.1688517' },
          address: 'Canton Rd, Tsim Sha Tsui'
        }
      ],
      serviceType: 'MOTORCYCLE',
      driver: {
        name: 'Mock Driver',
        phone: '+85212345678',
        licensePlate: 'MK1234'
      }
    }
  };

  console.log('✅ Sending mock response');
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(mockResponse));
};