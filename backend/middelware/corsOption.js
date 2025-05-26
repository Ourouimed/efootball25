const corsOptions = {
    origin: process.env.ALLOW_CORS_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization']
  };


module.exports = corsOptions