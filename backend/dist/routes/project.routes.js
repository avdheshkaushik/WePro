"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("../controllers/project.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken);
router.get('/', project_controller_1.ProjectController.getProjects);
router.post('/', project_controller_1.ProjectController.createProject);
router.get('/:id', project_controller_1.ProjectController.getProjectById);
router.put('/:id', project_controller_1.ProjectController.updateProject);
router.delete('/:id', project_controller_1.ProjectController.deleteProject);
router.get('/:id/tasks', project_controller_1.ProjectController.getProjectTasks);
router.get('/:id/members', project_controller_1.ProjectController.getProjectMembers);
router.post('/:id/members', project_controller_1.ProjectController.addProjectMember);
router.delete('/:id/members/:userId', project_controller_1.ProjectController.removeProjectMember);
exports.default = router;
//# sourceMappingURL=project.routes.js.map