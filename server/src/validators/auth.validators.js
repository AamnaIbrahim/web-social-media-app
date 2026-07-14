import { body } from 'express-validator';

export const registerValidator = [
  body('fullName').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be at least 2 characters'),
  body('username')
    .trim()
    .toLowerCase()
    .matches(/^[a-z0-9_]{3,20}$/)
    .withMessage('3-20 characters, lowercase letters, numbers and underscores only'),
  body('email').trim().isEmail().withMessage('Enter a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
];

export const loginValidator = [
  body('email').trim().isEmail().withMessage('Enter a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];