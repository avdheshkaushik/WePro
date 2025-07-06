import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { createError } from '../middleware/error.middleware';
import { AuthRequest } from '../middleware/auth.middleware';

export class TaskController {
  static async getTasks(req: Request, res: Response) {
    try {
      const { project_id, status, assignee_id, limit = 50, offset = 0 } = req.query;
      
      const filters = {
        project_id: project_id as string,
        status: status as string,
        assignee_id: assignee_id as string
      };

      const tasks = await TaskService.getTasks(filters, parseInt(limit as string), parseInt(offset as string));

      res.json({
        success: true,
        data: {
          tasks,
          pagination: {
            limit: parseInt(limit as string),
            offset: parseInt(offset as string)
          }
        }
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to fetch tasks'
      });
    }
  }

  static async createTask(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        throw createError('User not authenticated', 401);
      }

      const { title, description, project_id, assignee_id, due_date, priority } = req.body;
      const reporter_id = req.user.userId;

      const task = await TaskService.createTask({
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
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to create task'
      });
    }
  }

  static async getTaskById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await TaskService.getTaskById(id);
      
      if (!task) {
        throw createError('Task not found', 404);
      }

      res.json({
        success: true,
        data: { task }
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to get task'
      });
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const task = await TaskService.updateTask(id, updateData);

      res.json({
        success: true,
        message: 'Task updated successfully',
        data: { task }
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to update task'
      });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await TaskService.deleteTask(id);

      res.json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to delete task'
      });
    }
  }

  static async assignTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { assignee_id } = req.body;

      const task = await TaskService.assignTask(id, assignee_id);

      res.json({
        success: true,
        message: 'Task assigned successfully',
        data: { task }
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to assign task'
      });
    }
  }

  static async updateTaskStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const task = await TaskService.updateTaskStatus(id, status);

      res.json({
        success: true,
        message: 'Task status updated successfully',
        data: { task }
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to update task status'
      });
    }
  }

  static async getTaskComments(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const comments = await TaskService.getTaskComments(id);

      res.json({
        success: true,
        data: { comments }
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to get task comments'
      });
    }
  }

  static async addTaskComment(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        throw createError('User not authenticated', 401);
      }

      const { id } = req.params;
      const { content, parent_id } = req.body;
      const user_id = req.user.userId;

      const comment = await TaskService.addTaskComment(id, {
        content,
        user_id,
        parent_id
      });

      res.status(201).json({
        success: true,
        message: 'Comment added successfully',
        data: { comment }
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to add comment'
      });
    }
  }

  static async getTaskAttachments(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const attachments = await TaskService.getTaskAttachments(id);

      res.json({
        success: true,
        data: { attachments }
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to get task attachments'
      });
    }
  }

  static async uploadAttachment(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        throw createError('User not authenticated', 401);
      }

      const { id } = req.params;
      const user_id = req.user.userId;

      // TODO: Implement file upload logic
      // This would handle multipart form data and file storage

      res.status(201).json({
        success: true,
        message: 'Attachment uploaded successfully'
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to upload attachment'
      });
    }
  }
} 