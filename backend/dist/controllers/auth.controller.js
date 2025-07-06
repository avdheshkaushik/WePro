"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = require("../services/auth.service");
const error_middleware_1 = require("../middleware/error.middleware");
class AuthController {
    static async register(req, res) {
        try {
            const { email, password, first_name, last_name } = req.body;
            const existingUser = await auth_service_1.AuthService.findUserByEmail(email);
            if (existingUser) {
                throw (0, error_middleware_1.createError)('Email already exists', 400);
            }
            const user = await auth_service_1.AuthService.createUser({
                email,
                password,
                first_name,
                last_name
            });
            const token = jsonwebtoken_1.default.sign({
                userId: user.id,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name
                    }
                }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Registration failed'
            });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await auth_service_1.AuthService.authenticateUser(email, password);
            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name
                    }
                }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Login failed'
            });
        }
    }
    static async logout(req, res) {
        try {
            res.json({
                success: true,
                message: 'Logout successful'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Logout failed'
            });
        }
    }
    static async getCurrentUser(req, res) {
        try {
            if (!req.user) {
                throw (0, error_middleware_1.createError)('User not authenticated', 401);
            }
            const user = await auth_service_1.AuthService.findUserById(req.user.userId);
            if (!user) {
                throw (0, error_middleware_1.createError)('User not found', 404);
            }
            res.json({
                success: true,
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        avatar_url: user.avatar_url,
                        timezone: user.timezone,
                        language: user.language
                    }
                }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to get user'
            });
        }
    }
    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                throw (0, error_middleware_1.createError)('Refresh token required', 400);
            }
            const { user, token } = await auth_service_1.AuthService.refreshUserToken(refreshToken);
            res.json({
                success: true,
                data: {
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name
                    }
                }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Token refresh failed'
            });
        }
    }
    static async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            await auth_service_1.AuthService.sendPasswordResetEmail(email);
            res.json({
                success: true,
                message: 'Password reset email sent'
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to send reset email'
            });
        }
    }
    static async resetPassword(req, res) {
        try {
            const { token, password } = req.body;
            await auth_service_1.AuthService.resetPassword(token, password);
            res.json({
                success: true,
                message: 'Password reset successful'
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Password reset failed'
            });
        }
    }
    static async verifyEmail(req, res) {
        try {
            const { token } = req.body;
            await auth_service_1.AuthService.verifyEmail(token);
            res.json({
                success: true,
                message: 'Email verified successfully'
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Email verification failed'
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map