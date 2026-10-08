import { randomUUID } from "node:crypto";
import type { Task } from "../types/task.js";

const tasks: Task[] = [];

export const createTask = (
  title: string,
  description?: string,
): Task => {
  const now = new Date().toISOString();

  const task: Task = {
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

export const getTasks = (): Task[] => tasks;