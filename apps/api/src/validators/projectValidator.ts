import type { Request } from "express";
import type { ProjectStatus } from "../types/project.js";

const validStatuses: ProjectStatus[] = [
  "PLANNED",
  "IN_PROGRESS",
  "ON_HOLD",
  "COMPLETED",
  "CANCELLED",
];

export const validateCreateProject = (
  req: Request,
): string | null => {
  const {
    name,
    description,
    deadline,
  } = req.body;

  if (
    typeof name !== "string" ||
    name.trim().length === 0
  ) {
    return "Project name is required";
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return "Project description must be a string";
  }

  if (
    deadline !== undefined &&
    typeof deadline !== "string"
  ) {
    return "Project deadline must be a string";
  }

  return null;
};

export const validateUpdateProject = (
  req: Request,
): string | null => {
  const {
    name,
    description,
    status,
    deadline,
    progress,
  } = req.body;

  if (
    name !== undefined &&
    (
      typeof name !== "string" ||
      name.trim().length === 0
    )
  ) {
    return "Project name cannot be empty";
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return "Project description must be a string";
  }

  if (
    status !== undefined &&
    (
      typeof status !== "string" ||
      !validStatuses.includes(
        status as ProjectStatus,
      )
    )
  ) {
    return "Invalid project status";
  }

  if (
    deadline !== undefined &&
    typeof deadline !== "string"
  ) {
    return "Project deadline must be a string";
  }

  if (progress !== undefined) {
    if (
      typeof progress !== "number" ||
      !Number.isFinite(progress)
    ) {
      return "Project progress must be a number";
    }

    if (progress < 0 || progress > 100) {
      return "Project progress must be between 0 and 100";
    }
  }

  return null;
};