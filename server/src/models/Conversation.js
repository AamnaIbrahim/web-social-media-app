import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    participantIds: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      validate: {
        validator: (arr) => arr.length === 2,
        message: 'A conversation must have exactly 2 participants',
      },
    },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

conversationSchema.index({ participantIds: 1 });

export const Conversation = mongoose.model('Conversation', conversationSchema);