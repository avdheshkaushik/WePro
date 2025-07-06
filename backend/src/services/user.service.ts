import { UserModel, User } from '../models/user.model';
import { createError } from '../middleware/error.middleware';

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  timezone?: string;
  language?: string;
}

export class UserService {
  static async findUserById(id: string): Promise<User | null> {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw createError('Failed to find user', 500);
    }
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await UserModel.findByEmail(email);
    } catch (error) {
      throw createError('Failed to find user', 500);
    }
  }

  static async updateUser(userId: string, updateData: UpdateUserData): Promise<User> {
    try {
      const user = await UserModel.update(userId, updateData);
      if (!user) {
        throw createError('User not found', 404);
      }
      return user;
    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }
      throw createError('Failed to update user', 500);
    }
  }

  static async deleteUser(userId: string): Promise<void> {
    try {
      await UserModel.delete(userId);
    } catch (error: any) {
      throw createError('Failed to delete user', 500);
    }
  }

  static async getAllUsers(limit: number = 50, offset: number = 0): Promise<User[]> {
    try {
      return await UserModel.getAll(limit, offset);
    } catch (error) {
      throw createError('Failed to get users', 500);
    }
  }

  static async getUserCount(): Promise<number> {
    try {
      return await UserModel.count();
    } catch (error) {
      throw createError('Failed to get user count', 500);
    }
  }

  static async searchUsers(query: string, limit: number = 50, offset: number = 0): Promise<User[]> {
    try {
      // This would implement a search function in the UserModel
      // For now, we'll return all users and filter in memory
      const users = await this.getAllUsers(limit, offset);
      return users.filter(user => 
        user.first_name.toLowerCase().includes(query.toLowerCase()) ||
        user.last_name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      throw createError('Failed to search users', 500);
    }
  }

  static async getUserStats(userId: string): Promise<any> {
    try {
      // This would implement user statistics
      // For now, return basic info
      const user = await this.findUserById(userId);
      if (!user) {
        throw createError('User not found', 404);
      }

      return {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        email_verified: user.email_verified,
        last_login: user.last_login,
        created_at: user.created_at,
        // TODO: Add more stats like tasks completed, projects joined, etc.
      };
    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }
      throw createError('Failed to get user stats', 500);
    }
  }
} 