import { Router } from 'express';
import {
  getFeed,
  getPostById,
  createPost,
  toggleLike,
  toggleSave,
  getSavedPosts,
} from '../controllers/post.controller.js';
import { getComments, addComment } from '../controllers/comment.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { uploadPostImages } from '../middlewares/upload.js';
import { createPostValidator, commentValidator } from '../validators/post.validators.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

router.use(requireAuth);

router.get('/saved', getSavedPosts);
router.get('/', getFeed);
router.post('/', uploadPostImages, createPostValidator, validate, createPost);
router.get('/:id', getPostById);
router.patch('/:id/like', toggleLike);
router.patch('/:id/save', toggleSave);
router.get('/:id/comments', getComments);
router.post('/:id/comments', commentValidator, validate, addComment);

export default router;