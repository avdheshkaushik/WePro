import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { createError } from '../middleware/error.middleware';
import { AuthRequest } from '../middleware/auth.middleware';

export class UserController {
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        throw createError('User not authenticated', 401);
      }

      const user = await UserService.findUserById(req.user.userId);
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
            language: user.language,
            email_verified: user.email_verified,
            last_login: user.last_login
          }
        }
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to get profile'
      });
    }
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        throw createError('User not authenticated', 401);
      }

      const { first_name, last_name, avatar_url, timezone, language } = req.body;
      
      const updatedUser = await UserService.updateUser(req.user.userId, {
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
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to update profile'
      });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.findUserById(id);
      
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

  static async getUsers(req: Request, res: Response) {
    try {
      const { limit = 50, offset = 0 } = req.query;
      
      const users = await UserService.getAllUsers(
        parseInt(limit as string),
        parseInt(offset as string)
      );

      const total = await UserService.getUserCount();

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
            limit: parseInt(limit as string),
            offset: parseInt(offset as string)
          }
        }
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to get users'
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      await UserService.deleteUser(id);

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to delete user'
      });
    }
  }
} 