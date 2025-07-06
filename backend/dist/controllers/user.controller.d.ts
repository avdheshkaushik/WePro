import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare class UserController {
    static getProfile(req: AuthRequest, res: Response): Promise<void>;
    static updateProfile(req: AuthRequest, res: Response): Promise<void>;
    static getUserById(req: Request, res: Response): Promise<void>;
    static getUsers(req: Request, res: Response): Promise<void>;
    static deleteUser(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map