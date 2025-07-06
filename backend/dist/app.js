"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
dotenv_1.default.config();
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const organization_routes_1 = __importDefault(require("./routes/organization.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const monitoring_middleware_1 = require("./middleware/monitoring.middleware");
require("./config/database");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(monitoring_middleware_1.requestLogger);
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/tasks', task_routes_1.default);
app.use('/api/projects', project_routes_1.default);
app.use('/api/organizations', organization_routes_1.default);
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Route not found',
        path: req.originalUrl
    });
});
app.use(error_middleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 WePro API server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
exports.default = app;
//# sourceMappingURL=app.js.map