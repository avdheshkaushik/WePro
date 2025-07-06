"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const error_middleware_1 = require("../middleware/error.middleware");
class UserService {
    static async findUserById(id) {
        try {
            return await user_model_1.UserModel.findById(id);
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Failed to find user', 500);
        }
    }
    static async findUserByEmail(email) {
        try {
            return await user_model_1.UserModel.findByEmail(email);
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Failed to find user', 500);
        }
    }
    static async updateUser(userId, updateData) {
        try {
            const user = await user_model_1.UserModel.update(userId, updateData);
            if (!user) {
                throw (0, error_middleware_1.createError)('User not found', 404);
            }
            return user;
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            throw (0, error_middleware_1.createError)('Failed to update user', 500);
        }
    }
    static async deleteUser(userId) {
        try {
            await user_model_1.UserModel.delete(userId);
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Failed to delete user', 500);
        }
    }
    static async getAllUsers(limit = 50, offset = 0) {
        try {
            return await user_model_1.UserModel.getAll(limit, offset);
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Failed to get users', 500);
        }
    }
    static async getUserCount() {
        try {
            return await user_model_1.UserModel.count();
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Failed to get user count', 500);
        }
    }
    static async searchUsers(query, limit = 50, offset = 0) {
        try {
            const users = await this.getAllUsers(limit, offset);
            return users.filter(user => user.first_name.toLowerCase().includes(query.toLowerCase()) ||
                user.last_name.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase()));
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Failed to search users', 500);
        }
    }
    static async getUserStats(userId) {
        try {
            const user = await this.findUserById(userId);
            if (!user) {
                throw (0, error_middleware_1.createError)('User not found', 404);
            }
            return {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                email_verified: user.email_verified,
                last_login: user.last_login,
                created_at: user.created_at,
            };
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            throw (0, error_middleware_1.createError)('Failed to get user stats', 500);
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map