"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_middleware_1 = require("./error.middleware");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return next((0, error_middleware_1.createError)('Access token required', 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            organizationId: decoded.organizationId,
        };
        next();
    }
    catch (error) {
        return next((0, error_middleware_1.createError)('Invalid token', 403));
    }
};
exports.authenticateToken = authenticateToken;
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next((0, error_middleware_1.createError)('Authentication required', 401));
        }
        next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=auth.middleware.js.map