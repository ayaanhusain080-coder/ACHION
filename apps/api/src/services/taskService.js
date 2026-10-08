import { randomUUID } from "node:crypto";
const tasks = [];
export const createTask = (title, description) => {
    const now = new Date().toISOString();
    const task = {
        id: randomUUID(),
        title: title.trim(),
        ...(description ? { description: description.trim() } : {}),
        status: "INBOX",
        priority: "P2",
        createdAt: now,
        updatedAt: now,
    };
    tasks.push(task);
    return task;
};
export const getTasks = () => tasks;
//# sourceMappingURL=taskService.js.map