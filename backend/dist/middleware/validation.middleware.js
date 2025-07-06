"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrganization = exports.validateProject = exports.validateTask = exports.validateLogin = exports.validateRegistration = void 0;
const express_validator_1 = require("express-validator");
const error_middleware_1 = require("./error.middleware");
exports.validateRegistration = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    (0, express_validator_1.body)('first_name')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('First name is required and must be less than 100 characters'),
    (0, express_validator_1.body)('last_name')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Last name is required and must be less than 100 characters'),
    validateRequest
];
exports.validateLogin = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required'),
    validateRequest
];
exports.validateTask = [
    (0, express_validator_1.body)('title')
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage('Task title is required and must be less than 500 characters'),
    (0, express_validator_1.body)('project_id')
        .isUUID()
        .withMessage('Valid project ID is required'),
    (0, express_validator_1.body)('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),
    validateRequest
];
exports.validateProject = [
    (0, express_validator_1.body)('name')
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('Project name is required and must be less than 255 characters'),
    (0, express_validator_1.body)('workspace_id')
        .isUUID()
        .withMessage('Valid workspace ID is required'),
    validateRequest
];
exports.validateOrganization = [
    (0, express_validator_1.body)('name')
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('Organization name is required and must be less than 255 characters'),
    (0, express_validator_1.body)('slug')
        .trim()
        .isLength({ min: 1, max: 100 })
        .matches(/^[a-z0-9-]+$/)
        .withMessage('Slug must contain only lowercase letters, numbers, and hyphens'),
    validateRequest
];
function validateRequest(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return next((0, error_middleware_1.createError)(errorMessages.join(', '), 400));
    }
    next();
}
//# sourceMappingURL=validation.middleware.js.map