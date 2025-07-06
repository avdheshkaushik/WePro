"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
const error_middleware_1 = require("../middleware/error.middleware");
class TaskController {
    static async getTasks(req, res) {
        try {
            const { project_id, status, assignee_id, limit = 50, offset = 0 } = req.query;
            const filters = {
                project_id: project_id,
                status: status,
                assignee_id: assignee_id
            };
            const tasks = await task_service_1.TaskService.getTasks(filters, parseInt(limit), parseInt(offset));
            res.json({
                success: true,
                data: {
                    tasks,
                    pagination: {
                        limit: parseInt(limit),
                        offset: parseInt(offset)
                    }
                }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to fetch tasks'
            });
        }
    }
    static async createTask(req, res) {
        try {
            if (!req.user) {
                throw (0, error_middleware_1.createError)('User not authenticated', 401);
            }
            const { title, description, project_id, assignee_id, due_date, priority } = req.body;
            const reporter_id = req.user.userId;
            const task = await task_service_1.TaskService.createTask({
                title,
                description,
                project_id,
                assignee_id,
                reporter_id,
                due_date,
                priority
            });
            res.status(201).json({
                success: true,
                message: 'Task created successfully',
                data: { task }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to create task'
            });
        }
    }
    static async getTaskById(req, res) {
        try {
            const { id } = req.params;
            const task = await task_service_1.TaskService.getTaskById(id);
            if (!task) {
                throw (0, error_middleware_1.createError)('Task not found', 404);
            }
            res.json({
                success: true,
                data: { task }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to get task'
            });
        }
    }
    static async updateTask(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const task = await task_service_1.TaskService.updateTask(id, updateData);
            res.json({
                success: true,
                message: 'Task updated successfully',
                data: { task }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to update task'
            });
        }
    }
    static async deleteTask(req, res) {
        try {
            const { id } = req.params;
            await task_service_1.TaskService.deleteTask(id);
            res.json({
                success: true,
                message: 'Task deleted successfully'
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to delete task'
            });
        }
    }
    static async assignTask(req, res) {
        try {
            const { id } = req.params;
            const { assignee_id } = req.body;
            const task = await task_service_1.TaskService.assignTask(id, assignee_id);
            res.json({
                success: true,
                message: 'Task assigned successfully',
                data: { task }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to assign task'
            });
        }
    }
    static async updateTaskStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const task = await task_service_1.TaskService.updateTaskStatus(id, status);
            res.json({
                success: true,
                message: 'Task status updated successfully',
                data: { task }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to update task status'
            });
        }
    }
    static async getTaskComments(req, res) {
        try {
            const { id } = req.params;
            const comments = await task_service_1.TaskService.getTaskComments(id);
            res.json({
                success: true,
                data: { comments }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to get task comments'
            });
        }
    }
    static async addTaskComment(req, res) {
        try {
            if (!req.user) {
                throw (0, error_middleware_1.createError)('User not authenticated', 401);
            }
            const { id } = req.params;
            const { content, parent_id } = req.body;
            const user_id = req.user.userId;
            const comment = await task_service_1.TaskService.addTaskComment(id, {
                content,
                user_id,
                parent_id
            });
            res.status(201).json({
                success: true,
                message: 'Comment added successfully',
                data: { comment }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to add comment'
            });
        }
    }
    static async getTaskAttachments(req, res) {
        try {
            const { id } = req.params;
            const attachments = await task_service_1.TaskService.getTaskAttachments(id);
            res.json({
                success: true,
                data: { attachments }
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to get task attachments'
            });
        }
    }
    static async uploadAttachment(req, res) {
        try {
            if (!req.user) {
                throw (0, error_middleware_1.createError)('User not authenticated', 401);
            }
            const { id } = req.params;
            const user_id = req.user.userId;
            res.status(201).json({
                success: true,
                message: 'Attachment uploaded successfully'
            });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || 'Failed to upload attachment'
            });
        }
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map