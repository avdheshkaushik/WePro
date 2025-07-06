import { Request, Response, NextFunction } from 'express';
export declare const validateRegistration: (import("express-validator").ValidationChain | typeof validateRequest)[];
export declare const validateLogin: (import("express-validator").ValidationChain | typeof validateRequest)[];
export declare const validateTask: (import("express-validator").ValidationChain | typeof validateRequest)[];
export declare const validateProject: (import("express-validator").ValidationChain | typeof validateRequest)[];
export declare const validateOrganization: (import("express-validator").ValidationChain | typeof validateRequest)[];
declare function validateRequest(req: Request, res: Response, next: NextFunction): void;
export {};
//# sourceMappingURL=validation.middleware.d.ts.map