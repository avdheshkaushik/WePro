"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const error_middleware_1 = require("../middleware/error.middleware");
class AuthService {
    static async findUserByEmail(email) {
        try {
            return await user_model_1.UserModel.findByEmail(email);
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Failed to find user', 500);
        }
    }
    static async findUserById(id) {
        try {
            return await user_model_1.UserModel.findById(id);
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Failed to find user', 500);
        }
    }
    static async createUser(userData) {
        try {
            return await user_model_1.UserModel.create(userData);
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            throw (0, error_middleware_1.createError)('Failed to create user', 500);
        }
    }
    static async authenticateUser(email, password) {
        try {
            const user = await user_model_1.UserModel.findByEmail(email);
            if (!user) {
                throw (0, error_middleware_1.createError)('Invalid credentials', 401);
            }
            const isValidPassword = await bcryptjs_1.default.compare(password, user.password_hash);
            if (!isValidPassword) {
                throw (0, error_middleware_1.createError)('Invalid credentials', 401);
            }
            await user_model_1.UserModel.updateLastLogin(user.id);
            const token = jsonwebtoken_1.default.sign({
                userId: user.id,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: '24h' });
            return { user, token };
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            throw (0, error_middleware_1.createError)('Authentication failed', 500);
        }
    }
    static async refreshUserToken(refreshToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const user = await user_model_1.UserModel.findById(decoded.userId);
            if (!user) {
                throw (0, error_middleware_1.createError)('User not found', 404);
            }
            const token = jsonwebtoken_1.default.sign({
                userId: user.id,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: '24h' });
            return { user, token };
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            throw (0, error_middleware_1.createError)('Token refresh failed', 401);
        }
    }
    static async sendPasswordResetEmail(email) {
        try {
            const user = await user_model_1.UserModel.findByEmail(email);
            if (!user) {
                return;
            }
            const resetToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log(`Password reset token for ${email}: ${resetToken}`);
        }
        catch (error) {
            console.error('Password reset email error:', error);
        }
    }
    static async resetPassword(token, newPassword) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = await user_model_1.UserModel.findById(decoded.userId);
            if (!user) {
                throw (0, error_middleware_1.createError)('User not found', 404);
            }
            const hashedPassword = await bcryptjs_1.default.hash(newPassword, 12);
            await user_model_1.UserModel.update(user.id, { password_hash: hashedPassword });
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            throw (0, error_middleware_1.createError)('Password reset failed', 400);
        }
    }
    static async verifyEmail(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = await user_model_1.UserModel.findById(decoded.userId);
            if (!user) {
                throw (0, error_middleware_1.createError)('User not found', 404);
            }
            await user_model_1.UserModel.verifyEmail(user.id);
        }
        catch (error) {
            if (error.statusCode) {
                throw error;
            }
            throw (0, error_middleware_1.createError)('Email verification failed', 400);
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map