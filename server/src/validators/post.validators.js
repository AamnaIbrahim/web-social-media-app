import { body } from 'express-validator';

export const createPostValidator = [
  body('text').optional().isLength({ max: 500 }).withMessage('Post text is too long (max 500 characters)'),
];

export const commentValidator = [
  body('text').trim().notEmpty().withMessage('Comment cannot be empty').isLength({ max: 300 }),
];