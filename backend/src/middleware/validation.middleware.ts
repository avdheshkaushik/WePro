import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { createError } from './error.middleware';

export const validateRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('first_name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('First name is required and must be less than 100 characters'),
  body('last_name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Last name is required and must be less than 100 characters'),
  validateRequest
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validateRequest
];

export const validateTask = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Task title is required and must be less than 500 characters'),
  body('project_id')
    .isUUID()
    .withMessage('Valid project ID is required'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  validateRequest
];

export const validateProject = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Project name is required and must be less than 255 characters'),
  body('workspace_id')
    .isUUID()
    .withMessage('Valid workspace ID is required'),
  validateRequest
];

export const validateOrganization = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Organization name is required and must be less than 255 characters'),
  body('slug')
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug must contain only lowercase letters, numbers, and hyphens'),
  validateRequest
];

function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return next(createError(errorMessages.join(', '), 400));
  }
  next();
} 