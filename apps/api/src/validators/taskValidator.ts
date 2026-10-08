import type { Request } from "express";

export const validateCreateTask = (req: Request): string | null => {
  const { title } = req.body;

  if (typeof title !== "string" || title.trim().length === 0) {
    return "Task title is required";
  }

  return null;
};