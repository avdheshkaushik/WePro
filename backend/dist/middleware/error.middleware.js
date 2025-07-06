"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
    });
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = { message, statusCode: 404 };
    }
    if (err.name === 'MongoError' && err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = { message, statusCode: 400 };
    }
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message).join(', ');
        error = { message, statusCode: 400 };
    }
    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token';
        error = { message, statusCode: 401 };
    }
    if (err.name === 'TokenExpiredError') {
        const message = 'Token expired';
        error = { message, statusCode: 401 };
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
exports.errorHandler = errorHandler;
const createError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
};
exports.createError = createError;
//# sourceMappingURL=error.middleware.js.map