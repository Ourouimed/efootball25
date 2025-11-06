const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? process.env.ALLOW_CORS_URL : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };


module.exports = corsOptions