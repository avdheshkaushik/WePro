"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const error_middleware_1 = require("../middleware/error.middleware");
class UserController {
    static async getProfile(req, res) {
        try {
            if (!req.user) {
                throw (0, error_middleware_1.createError)('User not authenticated', 401);
            }
            const user = await user_service_1.UserService.findUserById(req.user.userId);
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
                        language: user.language,
                        email_verified: user.email_verified,
                        last_login: user.last_login
                    }
                }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to get profile'
            });
        }
    }
    static async updateProfile(req, res) {
        try {
            if (!req.user) {
                throw (0, error_middleware_1.createError)('User not authenticated', 401);
            }
            const { first_name, last_name, avatar_url, timezone, language } = req.body;
            const updatedUser = await user_service_1.UserService.updateUser(req.user.userId, {
                first_name,
                last_name,
                avatar_url,
                timezone,
                language
            });
            res.json({
                success: true,
                message: 'Profile updated successfully',
                data: {
                    user: {
                        id: updatedUser.id,
                        email: updatedUser.email,
                        first_name: updatedUser.first_name,
                        last_name: updatedUser.last_name,
                        avatar_url: updatedUser.avatar_url,
                        timezone: updatedUser.timezone,
                        language: updatedUser.language
                    }
                }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to update profile'
            });
        }
    }
    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await user_service_1.UserService.findUserById(id);
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
    static async getUsers(req, res) {
        try {
            const { limit = 50, offset = 0 } = req.query;
            const users = await user_service_1.UserService.getAllUsers(parseInt(limit), parseInt(offset));
            const total = await user_service_1.UserService.getUserCount();
            res.json({
                success: true,
                data: {
                    users: users.map(user => ({
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        avatar_url: user.avatar_url,
                        timezone: user.timezone,
                        language: user.language,
                        email_verified: user.email_verified,
                        last_login: user.last_login,
                        created_at: user.created_at
                    })),
                    pagination: {
                        total,
                        limit: parseInt(limit),
                        offset: parseInt(offset)
                    }
                }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to get users'
            });
        }
    }
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await user_service_1.UserService.deleteUser(id);
            res.json({
                success: true,
                message: 'User deleted successfully'
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to delete user'
            });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map