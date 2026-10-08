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
export const getTaskById = (id) => {
    return tasks.find((task) => task.id === id);
};
export const updateTask = (id, updates) => {
    const task = tasks.find((item) => item.id === id);
    if (!task) {
        return undefined;
    }
    if (updates.title !== undefined) {
        task.title = updates.title.trim();
    }
    if (updates.description !== undefined) {
        task.description = updates.description.trim();
    }
    if (updates.status !== undefined) {
        task.status = updates.status;
    }
    if (updates.priority !== undefined) {
        task.priority = updates.priority;
    }
    if (updates.dueDate !== undefined) {
        task.dueDate = updates.dueDate;
    }
    task.updatedAt = new Date().toISOString();
    return task;
};
export const deleteTask = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
        return false;
    }
    tasks.splice(index, 1);
    return true;
};
//# sourceMappingURL=taskService.js.map