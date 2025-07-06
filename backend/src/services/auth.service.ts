import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel, User, CreateUserData } from '../models/user.model';
import { createError } from '../middleware/error.middleware';

export interface LoginResult {
  user: User;
  token: string;
}

export class AuthService {
  static async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await UserModel.findByEmail(email);
    } catch (error) {
      throw createError('Failed to find user', 500);
    }
  }

  static async findUserById(id: string): Promise<User | null> {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw createError('Failed to find user', 500);
    }
  }

  static async createUser(userData: CreateUserData): Promise<User> {
    try {
      return await UserModel.create(userData);
    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }
      throw createError('Failed to create user', 500);
    }
  }

  static async authenticateUser(email: string, password: string): Promise<LoginResult> {
    try {
      const user = await UserModel.findByEmail(email);
      if (!user) {
        throw createError('Invalid credentials', 401);
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        throw createError('Invalid credentials', 401);
      }

      // Update last login
      await UserModel.updateLastLogin(user.id);

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email 
        },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      return { user, token };
    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }
      throw createError('Authentication failed', 500);
    }
  }

  static async refreshUserToken(refreshToken: string): Promise<LoginResult> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
      
      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        throw createError('User not found', 404);
      }

      // Generate new access token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email 
        },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      return { user, token };
    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }
      throw createError('Token refresh failed', 401);
    }
  }

  static async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      const user = await UserModel.findByEmail(email);
      if (!user) {
        // Don't reveal if email exists or not
        return;
      }

      // Generate reset token
      const resetToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );

      // TODO: Implement email sending
      // For now, just log the token
      console.log(`Password reset token for ${email}: ${resetToken}`);

    } catch (error) {
      // Don't throw error to prevent email enumeration
      console.error('Password reset email error:', error);
    }
  }

  static async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        throw createError('User not found', 404);
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update password
      await UserModel.update(user.id, { password_hash: hashedPassword });

    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }
      throw createError('Password reset failed', 400);
    }
  }

  static async verifyEmail(token: string): Promise<void> {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        throw createError('User not found', 404);
      }

      // Mark email as verified
      await UserModel.verifyEmail(user.id);

    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }
      throw createError('Email verification failed', 400);
    }
  }
} 