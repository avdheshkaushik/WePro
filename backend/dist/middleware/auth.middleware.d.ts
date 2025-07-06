import { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
        organizationId?: string;
    };
}
export declare const authenticateToken: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const requireRole: (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map