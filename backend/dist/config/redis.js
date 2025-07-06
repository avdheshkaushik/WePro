"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.redisConfig = void 0;
const redis_1 = __importDefault(require("redis"));
exports.redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0'),
    retryDelayOnFailover: 100,
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
};
exports.redisClient = redis_1.default.createClient(exports.redisConfig);
exports.redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
exports.redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});
exports.default = exports.redisClient;
//# sourceMappingURL=redis.js.map