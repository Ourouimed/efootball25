const corsOptions = {
    origin: process.env.ALLOW_CORS_URL ,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization']
  };


module.exports = corsOptions