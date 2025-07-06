import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRegistration, validateLogin } from '../middleware/validation.middleware';

const router = Router();

// POST /api/auth/register
router.post('/register', validateRegistration, AuthController.register);

// POST /api/auth/login
router.post('/login', validateLogin, AuthController.login);

// POST /api/auth/logout
router.post('/logout', AuthController.logout);

// GET /api/auth/me
router.get('/me', AuthController.getCurrentUser);

// POST /api/auth/refresh
router.post('/refresh', AuthController.refreshToken);

// POST /api/auth/forgot-password
router.post('/forgot-password', AuthController.forgotPassword);

// POST /api/auth/reset-password
router.post('/reset-password', AuthController.resetPassword);

// POST /api/auth/verify-email
router.post('/verify-email', AuthController.verifyEmail);

export default router; 