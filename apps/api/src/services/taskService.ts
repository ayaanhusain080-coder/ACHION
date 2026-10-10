import { randomUUID } from "node:crypto";
import type { Task } from "../types/task.js";

const tasks: Task[] = [];

export const createTask = (
  userId: string,
  title: string,
  description?: string,
): Task => {
  const now = new Date().toISOString();

  const task: Task = {
    id: randomUUID(),
    userId,
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

export const getTasks = (
  userId: string,
): Task[] => {
  return tasks.filter(
    (task) => task.userId === userId,
  );
};

export const getTaskById = (
  userId: string,
  id: string,
): Task | undefined => {
  return tasks.find(
    (task) =>
      task.id === id &&
      task.userId === userId,
  );
};

export const updateTask = (
  userId: string,
  id: string,
  updates: Partial<
    Pick<
      Task,
      "title" |
        "description" |
        "status" |
        "priority" |
        "dueDate"
    >
  >,
): Task | undefined => {
  const task = tasks.find(
    (item) =>
      item.id === id &&
      item.userId === userId,
  );

  if (!task) {
    return undefined;
  }

  if (updates.title !== undefined) {
    task.title = updates.title.trim();
  }

  if (updates.description !== undefined) {
    task.description =
      updates.description.trim();
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

  task.updatedAt =
    new Date().toISOString();

  return task;
};

export const deleteTask = (
  userId: string,
  id: string,
): boolean => {
  const index = tasks.findIndex(
    (task) =>
      task.id === id &&
      task.userId === userId,
  );

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);

  return true;
};