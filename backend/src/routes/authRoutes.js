import { Router } from 'express';
import { signup, login } from '../controllers/authController.js';
import { signupValidator, loginValidator, handleValidation } from '../middleware/validators.js';

const router = Router();

router.post('/signup', signupValidator, handleValidation, signup);
router.post('/login', loginValidator, handleValidation, login);

export default router;
