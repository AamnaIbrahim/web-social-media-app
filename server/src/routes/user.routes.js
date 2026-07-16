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

const router = Router();

router.use(requireAuth);

router.get('/suggested', getSuggestedUsers);
router.get('/search', searchUsers);
router.patch('/me', uploadAvatar, updateMyProfile);
router.get('/:username', getUserByUsername);
router.post('/:id/follow', followUser);
router.delete('/:id/follow', unfollowUser);

export default router;