import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare class AuthController {
    static register(req: Request, res: Response): Promise<void>;
    static login(req: Request, res: Response): Promise<void>;
    static logout(req: AuthRequest, res: Response): Promise<void>;
    static getCurrentUser(req: AuthRequest, res: Response): Promise<void>;
    static refreshToken(req: Request, res: Response): Promise<void>;
    static forgotPassword(req: Request, res: Response): Promise<void>;
    static resetPassword(req: Request, res: Response): Promise<void>;
    static verifyEmail(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map