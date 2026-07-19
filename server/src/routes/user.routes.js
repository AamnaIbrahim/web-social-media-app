import { Router } from 'express';
import {
  getUserByUsername,
  followUser,
  unfollowUser,
  updateMyProfile,
  getSuggestedUsers,
  searchUsers,
} from '../controllers/user.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { uploadAvatar } from '../middlewares/upload.js';
import { getUserPosts } from '../controllers/post.controller.js';
import { getMyWeeklyInsights } from '../controllers/user.controller.js';

const router = Router();

router.use(requireAuth);

router.get('/suggested', getSuggestedUsers);
router.get('/search', searchUsers);
router.patch('/me', uploadAvatar, updateMyProfile);
router.get('/:username', getUserByUsername);
router.post('/:id/follow', followUser);
router.delete('/:id/follow', unfollowUser);
router.get('/:username/posts', getUserPosts);
router.get('/me/insights', getMyWeeklyInsights);

export default router;