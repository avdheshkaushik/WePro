"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken);
router.get('/profile', user_controller_1.UserController.getProfile);
router.put('/profile', user_controller_1.UserController.updateProfile);
router.get('/:id', user_controller_1.UserController.getUserById);
router.get('/', user_controller_1.UserController.getUsers);
router.delete('/:id', user_controller_1.UserController.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map