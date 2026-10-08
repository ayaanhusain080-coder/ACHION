import type { Task } from "../types/task.js";
export declare const createTask: (title: string, description?: string) => Task;
export declare const getTasks: () => Task[];
export declare const getTaskById: (id: string) => Task | undefined;
export declare const updateTask: (id: string, updates: Partial<Pick<Task, "title" | "description" | "status" | "priority" | "dueDate">>) => Task | undefined;
export declare const deleteTask: (id: string) => boolean;
//# sourceMappingURL=taskService.d.ts.map