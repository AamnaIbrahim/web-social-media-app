import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  privacy: {
    privateAccount: { type: Boolean, default: false },
    showActivityStatus: { type: Boolean, default: true },
    allowMentions: { type: Boolean, default: true },
  },
  notifications: {
    likes: { type: Boolean, default: true },
    comments: { type: Boolean, default: true },
    follows: { type: Boolean, default: true },
  },
});

export const Preference = mongoose.model('Preference', preferenceSchema);