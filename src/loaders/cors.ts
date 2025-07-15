import cors from 'cors';

const corsOptions = {
  origin: '*', // Allow all origins
  methods: 'GET,POST,PUT,DELETE', // Allow specific methods
  allowedHeaders: 'Content-Type, Authorization', // Allow specific headers
  exposedHeaders: 'Content-Length, X-JSON', // Expose specific headers
  credentials: true, // Allow credentials
  optionsSuccessStatus: 204, // For legacy browser support
  maxAge: 86400, // Cache preflight response for 24 hours
};

export default cors(corsOptions);
