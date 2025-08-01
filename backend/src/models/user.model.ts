import bcrypt from 'bcryptjs';
import { createError } from '../middleware/error.middleware';
import { pool } from '../config/database';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  timezone?: string;
  language?: string;
  email_verified: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  timezone?: string;
  language?: string;
  password_hash?: string;
}

export class UserModel {
  static async findById(id: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw createError('Database error', 500);
    }
  }

  static async findByEmail(email: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      throw createError('Database error', 500);
    }
  }

  static async create(userData: CreateUserData): Promise<User> {
    try {
      const { email, password, first_name, last_name } = userData;
      const password_hash = await bcrypt.hash(password, 12);

      const query = `
        INSERT INTO users (email, password_hash, first_name, last_name, email_verified)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      
      const result = await pool.query(query, [
        email,
        password_hash,
        first_name,
        last_name,
        false
      ]);

      return result.rows[0];
    } catch (error: any) {
      if (error.code === '23505') { // Unique violation
        throw createError('Email already exists', 400);
      }
      throw createError('Database error', 500);
    }
  }

  static async update(id: string, updateData: UpdateUserData): Promise<User | null> {
    try {
      const fields = Object.keys(updateData);
      const values = Object.values(updateData);
      
      if (fields.length === 0) {
        return this.findById(id);
      }

      const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
      const query = `
        UPDATE users 
        SET ${setClause}, updated_at = NOW()
        WHERE id = $1
        RETURNING *
      `;

      const result = await pool.query(query, [id, ...values]);
      return result.rows[0] || null;
    } catch (error) {
      throw createError('Database error', 500);
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      const query = 'DELETE FROM users WHERE id = $1';
      await pool.query(query, [id]);
    } catch (error) {
      throw createError('Database error', 500);
    }
  }

  static async getAll(limit: number = 50, offset: number = 0): Promise<User[]> {
    try {
      const query = 'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2';
      const result = await pool.query(query, [limit, offset]);
      return result.rows;
    } catch (error) {
      throw createError('Database error', 500);
    }
  }

  static async count(): Promise<number> {
    try {
      const query = 'SELECT COUNT(*) FROM users';
      const result = await pool.query(query);
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw createError('Database error', 500);
    }
  }

  static async updateLastLogin(id: string): Promise<void> {
    try {
      const query = 'UPDATE users SET last_login = NOW() WHERE id = $1';
      await pool.query(query, [id]);
    } catch (error) {
      throw createError('Database error', 500);
    }
  }

  static async verifyEmail(id: string): Promise<void> {
    try {
      const query = 'UPDATE users SET email_verified = true WHERE id = $1';
      await pool.query(query, [id]);
    } catch (error) {
      throw createError('Database error', 500);
    }
  }
} 