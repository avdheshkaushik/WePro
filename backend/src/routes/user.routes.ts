import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/users/profile
router.get('/profile', UserController.getProfile);

// PUT /api/users/profile
router.put('/profile', UserController.updateProfile);

// GET /api/users/:id
router.get('/:id', UserController.getUserById);

// GET /api/users
router.get('/', UserController.getUsers);

// DELETE /api/users/:id
router.delete('/:id', UserController.deleteUser);

export default router; 