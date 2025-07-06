"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.dbConfig = void 0;
const pg_1 = require("pg");
exports.dbConfig = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'wepro_db',
    password: process.env.DB_PASSWORD || 'password',
    port: parseInt(process.env.DB_PORT || '5432'),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};
exports.pool = new pg_1.Pool(exports.dbConfig);
exports.pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});
exports.pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
exports.default = exports.pool;
//# sourceMappingURL=database.js.map