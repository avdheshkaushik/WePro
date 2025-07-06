"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
router.post('/register', validation_middleware_1.validateRegistration, auth_controller_1.AuthController.register);
router.post('/login', validation_middleware_1.validateLogin, auth_controller_1.AuthController.login);
router.post('/logout', auth_controller_1.AuthController.logout);
router.get('/me', auth_controller_1.AuthController.getCurrentUser);
router.post('/refresh', auth_controller_1.AuthController.refreshToken);
router.post('/forgot-password', auth_controller_1.AuthController.forgotPassword);
router.post('/reset-password', auth_controller_1.AuthController.resetPassword);
router.post('/verify-email', auth_controller_1.AuthController.verifyEmail);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map