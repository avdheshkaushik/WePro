import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare class TaskController {
    static getTasks(req: Request, res: Response): Promise<void>;
    static createTask(req: AuthRequest, res: Response): Promise<void>;
    static getTaskById(req: Request, res: Response): Promise<void>;
    static updateTask(req: Request, res: Response): Promise<void>;
    static deleteTask(req: Request, res: Response): Promise<void>;
    static assignTask(req: Request, res: Response): Promise<void>;
    static updateTaskStatus(req: Request, res: Response): Promise<void>;
    static getTaskComments(req: Request, res: Response): Promise<void>;
    static addTaskComment(req: AuthRequest, res: Response): Promise<void>;
    static getTaskAttachments(req: Request, res: Response): Promise<void>;
    static uploadAttachment(req: AuthRequest, res: Response): Promise<void>;
}
//# sourceMappingURL=task.controller.d.ts.map