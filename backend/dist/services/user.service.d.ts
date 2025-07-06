import { User } from '../models/user.model';
export interface UpdateUserData {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
    timezone?: string;
    language?: string;
}
export declare class UserService {
    static findUserById(id: string): Promise<User | null>;
    static findUserByEmail(email: string): Promise<User | null>;
    static updateUser(userId: string, updateData: UpdateUserData): Promise<User>;
    static deleteUser(userId: string): Promise<void>;
    static getAllUsers(limit?: number, offset?: number): Promise<User[]>;
    static getUserCount(): Promise<number>;
    static searchUsers(query: string, limit?: number, offset?: number): Promise<User[]>;
    static getUserStats(userId: string): Promise<any>;
}
//# sourceMappingURL=user.service.d.ts.map