import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/tasks
router.get('/', TaskController.getTasks);

// POST /api/tasks
router.post('/', TaskController.createTask);

// GET /api/tasks/:id
router.get('/:id', TaskController.getTaskById);

// PUT /api/tasks/:id
router.put('/:id', TaskController.updateTask);

// DELETE /api/tasks/:id
router.delete('/:id', TaskController.deleteTask);

// POST /api/tasks/:id/assign
router.post('/:id/assign', TaskController.assignTask);

// POST /api/tasks/:id/status
router.post('/:id/status', TaskController.updateTaskStatus);

// GET /api/tasks/:id/comments
router.get('/:id/comments', TaskController.getTaskComments);

// POST /api/tasks/:id/comments
router.post('/:id/comments', TaskController.addTaskComment);

// GET /api/tasks/:id/attachments
router.get('/:id/attachments', TaskController.getTaskAttachments);

// POST /api/tasks/:id/attachments
router.post('/:id/attachments', TaskController.uploadAttachment);

export default router; 