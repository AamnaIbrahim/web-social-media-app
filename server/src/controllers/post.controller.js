import { Post } from '../models/Post.js';
import { Like } from '../models/Like.js';
import { Save } from '../models/Save.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createNotification } from '../controllers/notification.controller.js';

async function hydratePosts(posts, userId) {
  const postIds = posts.map((p) => p._id);
  const userIds = [...new Set(posts.map((p) => String(p.userId)))];

  const [users, likedPostIds, savedPostIds] = await Promise.all([
    User.find({ _id: { $in: userIds } }),
    Like.find({ userId, postId: { $in: postIds } }).distinct('postId'),
    Save.find({ userId, postId: { $in: postIds } }).distinct('postId'),
  ]);

  const likedSet = new Set(likedPostIds.map(String));
  const savedSet = new Set(savedPostIds.map(String));
  const userMap = new Map(users.map((u) => [String(u._id), u.toPublicJSON()]));

  return posts.map((post) => ({
    id: post._id,
    text: post.text,
    images: post.images,
    likeCount: post.likeCount,
    commentCount: post.commentCount,
    createdAt: post.createdAt,
    user: userMap.get(String(post.userId)),
    liked: likedSet.has(String(post._id)),
    saved: savedSet.has(String(post._id)),
  }));
}

export const getFeed = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Post.countDocuments(),
  ]);

  const hydrated = await hydratePosts(posts, req.user._id);

  res.status(200).json({
    success: true,
    data: hydrated,
    nextPage: skip + limit < total ? page + 1 : null,
  });
});

export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new AppError('Post not found', 404);

  const [hydrated] = await hydratePosts([post], req.user._id);
  res.status(200).json({ success: true, data: hydrated });
});

export const createPost = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text?.trim() && (!req.files || req.files.length === 0)) {
    throw new AppError('A post needs text or at least one image', 400);
  }

  const images = (req.files ?? []).map((file) => file.path);

  const post = await Post.create({ userId: req.user._id, text: text ?? '', images });
  await User.findByIdAndUpdate(req.user._id, { $inc: { postCount: 1 } });

  const [hydrated] = await hydratePosts([post], req.user._id);
  res.status(201).json({ success: true, data: hydrated });
});

export const toggleLike = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) throw new AppError('Post not found', 404);

  const existing = await Like.findOne({ userId: req.user._id, postId });

  if (existing) {
    await existing.deleteOne();
    post.likeCount = Math.max(0, post.likeCount - 1);
  } else {
    await Like.create({ userId: req.user._id, postId });
    post.likeCount += 1;

    await createNotification({
      recipientId: post.userId,
      actorId: req.user._id,
      type: 'like',
      targetPostId: post._id,
      message: `${req.user.name} liked your post`,
    });
  }
  await post.save();

  const [hydrated] = await hydratePosts([post], req.user._id);
  res.status(200).json({ success: true, data: hydrated });
});

export const toggleSave = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) throw new AppError('Post not found', 404);

  const existing = await Save.findOne({ userId: req.user._id, postId });

  if (existing) {
    await existing.deleteOne();
  } else {
    await Save.create({ userId: req.user._id, postId });
  }

  const [hydrated] = await hydratePosts([post], req.user._id);
  res.status(200).json({ success: true, data: hydrated });
});

export const getUserPosts = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) throw new AppError('User not found', 404);

  const posts = await Post.find({ userId: user._id }).sort({ createdAt: -1 });
  const hydrated = await hydratePosts(posts, req.user._id);

  res.status(200).json({ success: true, data: hydrated });
});

export const getSavedPosts = asyncHandler(async (req, res) => {
  const savedPostIds = await Save.find({ userId: req.user._id }).distinct('postId');
  const posts = await Post.find({ _id: { $in: savedPostIds } }).sort({ createdAt: -1 });
  const hydrated = await hydratePosts(posts, req.user._id);

  res.status(200).json({ success: true, data: hydrated });
});