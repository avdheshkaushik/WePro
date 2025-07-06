import { User, CreateUserData } from '../models/user.model';
export interface LoginResult {
    user: User;
    token: string;
}
export declare class AuthService {
    static findUserByEmail(email: string): Promise<User | null>;
    static findUserById(id: string): Promise<User | null>;
    static createUser(userData: CreateUserData): Promise<User>;
    static authenticateUser(email: string, password: string): Promise<LoginResult>;
    static refreshUserToken(refreshToken: string): Promise<LoginResult>;
    static sendPasswordResetEmail(email: string): Promise<void>;
    static resetPassword(token: string, newPassword: string): Promise<void>;
    static verifyEmail(token: string): Promise<void>;
}
//# sourceMappingURL=auth.service.d.ts.map