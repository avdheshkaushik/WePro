import { Router } from 'express';
import { OrganizationController } from '../controllers/organization.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/organizations
router.get('/', OrganizationController.getOrganizations);

// POST /api/organizations
router.post('/', OrganizationController.createOrganization);

// GET /api/organizations/:id
router.get('/:id', OrganizationController.getOrganizationById);

// PUT /api/organizations/:id
router.put('/:id', OrganizationController.updateOrganization);

// DELETE /api/organizations/:id
router.delete('/:id', OrganizationController.deleteOrganization);

// GET /api/organizations/:id/members
router.get('/:id/members', OrganizationController.getOrganizationMembers);

// POST /api/organizations/:id/members
router.post('/:id/members', OrganizationController.addOrganizationMember);

// PATCH /api/organizations/:id/members/:memberId/role
router.patch('/:id/members/:memberId/role', OrganizationController.updateMemberRole);

// DELETE /api/organizations/:id/members/:memberId
router.delete('/:id/members/:memberId', OrganizationController.removeOrganizationMember);

// GET /api/organizations/:id/workspaces
router.get('/:id/workspaces', OrganizationController.getOrganizationWorkspaces);

// POST /api/organizations/:id/workspaces
router.post('/:id/workspaces', OrganizationController.createWorkspace);

export default router; 