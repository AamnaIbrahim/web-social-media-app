import { Router } from 'express';
import { register, login, logout, me, refresh, verifyOtp, resendOtp } from '../controllers/auth.controller.js';
import { registerValidator, loginValidator } from '../validators/auth.validators.js';
import { validate } from '../middlewares/validate.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.post('/register', registerValidator, validate, register);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/login', loginValidator, validate, login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);
router.post('/refresh', refresh);

export default router;