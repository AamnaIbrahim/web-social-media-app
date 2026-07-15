import dotenv from 'dotenv';
dotenv.config();

const requiredVars = ['MONGODB_URI', 'CLIENT_URL', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];

const missing = requiredVars.filter((key) => !process.env[key]);
if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT) || 5000,
  mongodbUri: process.env.MONGODB_URI,
  clientUrl: process.env.CLIENT_URL,
  isProduction: process.env.NODE_ENV === 'production',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
  },
};