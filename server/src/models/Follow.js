import mongoose from 'mongoose';

const followSchema = new mongoose.Schema(
  {
    followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followedId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

followSchema.index({ followerId: 1, followedId: 1 }, { unique: true });

export const Follow = mongoose.model('Follow', followSchema);