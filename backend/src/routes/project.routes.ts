import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/projects
router.get('/', ProjectController.getProjects);

// POST /api/projects
router.post('/', ProjectController.createProject);

// GET /api/projects/:id
router.get('/:id', ProjectController.getProjectById);

// PUT /api/projects/:id
router.put('/:id', ProjectController.updateProject);

// DELETE /api/projects/:id
router.delete('/:id', ProjectController.deleteProject);

// GET /api/projects/:id/tasks
router.get('/:id/tasks', ProjectController.getProjectTasks);

// GET /api/projects/:id/members
router.get('/:id/members', ProjectController.getProjectMembers);

// POST /api/projects/:id/members
router.post('/:id/members', ProjectController.addProjectMember);

// DELETE /api/projects/:id/members/:userId
router.delete('/:id/members/:userId', ProjectController.removeProjectMember);

export default router; 