import type { Request } from "express";
import type { TaskPriority, TaskStatus } from "../types/task.js";

const validStatuses: TaskStatus[] = [
  "INBOX",
  "PLANNED",
  "IN_PROGRESS",
  "COMPLETED",
  "BLOCKED",
  "CANCELLED",
];

const validPriorities: TaskPriority[] = [
  "P0",
  "P1",
  "P2",
  "P3",
];

export const validateCreateTask = (
  req: Request,
): string | null => {
  const { title } = req.body;

  if (
    typeof title !== "string" ||
    title.trim().length === 0
  ) {
    return "Task title is required";
  }

  return null;
};

export const validateUpdateTask = (
  req: Request,
): string | null => {
  const {
    title,
    description,
    status,
    priority,
    dueDate,
  } = req.body;

  if (
    title !== undefined &&
    (
      typeof title !== "string" ||
      title.trim().length === 0
    )
  ) {
    return "Task title cannot be empty";
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return "Task description must be a string";
  }

  if (
    status !== undefined &&
    (
      typeof status !== "string" ||
      !validStatuses.includes(status as TaskStatus)
    )
  ) {
    return "Invalid task status";
  }

  if (
    priority !== undefined &&
    (
      typeof priority !== "string" ||
      !validPriorities.includes(priority as TaskPriority)
    )
  ) {
    return "Invalid task priority";
  }

  if (
    dueDate !== undefined &&
    typeof dueDate !== "string"
  ) {
    return "Task dueDate must be a string";
  }

  return null;
};