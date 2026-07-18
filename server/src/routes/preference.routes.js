import { Router } from 'express';
import { getPreferences, updatePreferences, changePassword } from '../controllers/preference.controller.js';
import { changePasswordValidator } from '../validators/preference.validators.js';
import { validate } from '../middlewares/validate.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/', getPreferences);
router.patch('/', updatePreferences);
router.patch('/password', changePasswordValidator, validate, changePassword);

export default router;