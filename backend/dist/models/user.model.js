"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const pg_1 = require("pg");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_middleware_1 = require("../middleware/error.middleware");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
class UserModel {
    static async findById(id) {
        try {
            const query = 'SELECT * FROM users WHERE id = $1';
            const result = await pool.query(query, [id]);
            return result.rows[0] || null;
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Database error', 500);
        }
    }
    static async findByEmail(email) {
        try {
            const query = 'SELECT * FROM users WHERE email = $1';
            const result = await pool.query(query, [email]);
            return result.rows[0] || null;
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Database error', 500);
        }
    }
    static async create(userData) {
        try {
            const { email, password, first_name, last_name } = userData;
            const password_hash = await bcryptjs_1.default.hash(password, 12);
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
        }
        catch (error) {
            if (error.code === '23505') {
                throw (0, error_middleware_1.createError)('Email already exists', 400);
            }
            throw (0, error_middleware_1.createError)('Database error', 500);
        }
    }
    static async update(id, updateData) {
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
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Database error', 500);
        }
    }
    static async delete(id) {
        try {
            const query = 'DELETE FROM users WHERE id = $1';
            await pool.query(query, [id]);
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Database error', 500);
        }
    }
    static async getAll(limit = 50, offset = 0) {
        try {
            const query = 'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2';
            const result = await pool.query(query, [limit, offset]);
            return result.rows;
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Database error', 500);
        }
    }
    static async count() {
        try {
            const query = 'SELECT COUNT(*) FROM users';
            const result = await pool.query(query);
            return parseInt(result.rows[0].count);
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Database error', 500);
        }
    }
    static async updateLastLogin(id) {
        try {
            const query = 'UPDATE users SET last_login = NOW() WHERE id = $1';
            await pool.query(query, [id]);
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Database error', 500);
        }
    }
    static async verifyEmail(id) {
        try {
            const query = 'UPDATE users SET email_verified = true WHERE id = $1';
            await pool.query(query, [id]);
        }
        catch (error) {
            throw (0, error_middleware_1.createError)('Database error', 500);
        }
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map