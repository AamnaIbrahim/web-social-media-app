import { Comment } from '../models/Comment.js';
import { Post } from '../models/Post.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createNotification } from '../controllers/notification.controller.js';

export const getComments = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  const comments = await Comment.find({ postId }).sort({ createdAt: 1 });
  const userIds = [...new Set(comments.map((c) => String(c.userId)))];
  const users = await User.find({ _id: { $in: userIds } });
  const userMap = new Map(users.map((u) => [String(u._id), u.toPublicJSON()]));

  const hydrated = comments.map((c) => ({
    id: c._id,
    text: c.text,
    createdAt: c.createdAt,
    user: userMap.get(String(c.userId)),
  }));

  res.status(200).json({ success: true, data: hydrated });
});

export const addComment = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const { text } = req.body;

  if (!text?.trim()) throw new AppError('Comment cannot be empty', 400);

  const post = await Post.findById(postId);
  if (!post) throw new AppError('Post not found', 404);

  const comment = await Comment.create({ postId, userId: req.user._id, text: text.trim() });
  post.commentCount += 1;
  await post.save();

  await createNotification({
    recipientId: post.userId,
    actorId: req.user._id,
    type: 'comment',
    targetPostId: post._id,
    message: `${req.user.name} commented on your post`,
  });

  res.status(201).json({
    success: true,
    data: { id: comment._id, text: comment.text, createdAt: comment.createdAt, user: req.user.toPublicJSON() },
  });
});