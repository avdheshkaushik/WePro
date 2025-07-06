export interface TaskFilters {
    project_id?: string;
    status?: string;
    assignee_id?: string;
}
export interface CreateTaskData {
    title: string;
    description?: string;
    project_id: string;
    assignee_id?: string;
    reporter_id: string;
    due_date?: Date;
    priority?: 'low' | 'medium' | 'high';
}
export interface CreateCommentData {
    content: string;
    user_id: string;
    parent_id?: string;
}
export declare class TaskService {
    static getTasks(filters: TaskFilters, limit?: number, offset?: number): Promise<any[]>;
    static createTask(taskData: CreateTaskData): Promise<any>;
    static getTaskById(id: string): Promise<any | null>;
    static updateTask(id: string, updateData: any): Promise<any>;
    static deleteTask(id: string): Promise<void>;
    static assignTask(id: string, assignee_id: string): Promise<any>;
    static updateTaskStatus(id: string, status: string): Promise<any>;
    static getTaskComments(taskId: string): Promise<any[]>;
    static addTaskComment(taskId: string, commentData: CreateCommentData): Promise<any>;
    static getTaskAttachments(taskId: string): Promise<any[]>;
}
//# sourceMappingURL=task.service.d.ts.map