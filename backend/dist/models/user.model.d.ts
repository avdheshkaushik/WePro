export interface User {
    id: string;
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
    timezone?: string;
    language?: string;
    email_verified: boolean;
    last_login?: Date;
    created_at: Date;
    updated_at: Date;
}
export interface CreateUserData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}
export interface UpdateUserData {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
    timezone?: string;
    language?: string;
    password_hash?: string;
}
export declare class UserModel {
    static findById(id: string): Promise<User | null>;
    static findByEmail(email: string): Promise<User | null>;
    static create(userData: CreateUserData): Promise<User>;
    static update(id: string, updateData: UpdateUserData): Promise<User | null>;
    static delete(id: string): Promise<void>;
    static getAll(limit?: number, offset?: number): Promise<User[]>;
    static count(): Promise<number>;
    static updateLastLogin(id: string): Promise<void>;
    static verifyEmail(id: string): Promise<void>;
}
//# sourceMappingURL=user.model.d.ts.map