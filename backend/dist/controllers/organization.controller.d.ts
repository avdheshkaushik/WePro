import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare class OrganizationController {
    static getOrganizations(req: Request, res: Response): Promise<void>;
    static createOrganization(req: AuthRequest, res: Response): Promise<void>;
    static getOrganizationById(req: Request, res: Response): Promise<void>;
    static updateOrganization(req: Request, res: Response): Promise<void>;
    static deleteOrganization(req: Request, res: Response): Promise<void>;
    static getOrganizationMembers(req: Request, res: Response): Promise<void>;
    static addOrganizationMember(req: Request, res: Response): Promise<void>;
    static updateMemberRole(req: Request, res: Response): Promise<void>;
    static removeOrganizationMember(req: Request, res: Response): Promise<void>;
    static getOrganizationWorkspaces(req: Request, res: Response): Promise<void>;
    static createWorkspace(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=organization.controller.d.ts.map