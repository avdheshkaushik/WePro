import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createError } from './error.middleware';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    organizationId?: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(createError('Access token required', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      organizationId: decoded.organizationId,
    };
    next();
  } catch (error) {
    return next(createError('Invalid token', 403));
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createError('Authentication required', 401));
    }

    // TODO: Implement role checking logic
    // This would check the user's role in the organization
    next();
  };
}; 