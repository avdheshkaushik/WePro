import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth.service';
import { createError } from '../middleware/error.middleware';
import { AuthRequest } from '../middleware/auth.middleware';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, first_name, last_name } = req.body;
      
      // Check if user already exists
      const existingUser = await AuthService.findUserByEmail(email);
      if (existingUser) {
        throw createError('Email already exists', 400);
      }
      
      // Create user
      const user = await AuthService.createUser({
        email,
        password,
        first_name,
        last_name
      });

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email 
        },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

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
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Registration failed'
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      // Authenticate user
      const { user, token } = await AuthService.authenticateUser(email, password);

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
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Login failed'
      });
    }
  }

  static async logout(req: AuthRequest, res: Response) {
    try {
      // In a real application, you might want to blacklist the token
      // For now, we'll just return a success response
      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Logout failed'
      });
    }
  }

  static async getCurrentUser(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        throw createError('User not authenticated', 401);
      }

      const user = await AuthService.findUserById(req.user.userId);
      if (!user) {
        throw createError('User not found', 404);
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
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to get user'
      });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        throw createError('Refresh token required', 400);
      }

      const { user, token } = await AuthService.refreshUserToken(refreshToken);

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
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Token refresh failed'
      });
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      
      await AuthService.sendPasswordResetEmail(email);

      res.json({
        success: true,
        message: 'Password reset email sent'
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to send reset email'
      });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { token, password } = req.body;
      
      await AuthService.resetPassword(token, password);

      res.json({
        success: true,
        message: 'Password reset successful'
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Password reset failed'
      });
    }
  }

  static async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.body;
      
      await AuthService.verifyEmail(token);

      res.json({
        success: true,
        message: 'Email verified successfully'
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Email verification failed'
      });
    }
  }
} 