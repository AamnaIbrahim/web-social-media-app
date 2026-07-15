import mongoose from 'mongoose';

const pendingRegistrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    otpCode: { type: String, required: true }, 
    otpExpiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

pendingRegistrationSchema.index({ otpExpiresAt: 1 }, { expireAfterSeconds: 0 });

export const PendingRegistration = mongoose.model('PendingRegistration', pendingRegistrationSchema);