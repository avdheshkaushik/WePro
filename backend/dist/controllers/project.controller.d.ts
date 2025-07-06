import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare class ProjectController {
    static getProjects(req: Request, res: Response): Promise<void>;
    static createProject(req: AuthRequest, res: Response): Promise<void>;
    static getProjectById(req: Request, res: Response): Promise<void>;
    static updateProject(req: Request, res: Response): Promise<void>;
    static deleteProject(req: Request, res: Response): Promise<void>;
    static getProjectTasks(req: Request, res: Response): Promise<void>;
    static getProjectMembers(req: Request, res: Response): Promise<void>;
    static addProjectMember(req: Request, res: Response): Promise<void>;
    static removeProjectMember(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=project.controller.d.ts.map