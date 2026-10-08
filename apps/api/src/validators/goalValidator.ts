import type { Request } from "express";
import type {
  GoalLevel,
  GoalStatus,
} from "../types/goal.js";

const validLevels: GoalLevel[] = [
  "VISION",
  "GOAL",
];

const validStatuses: GoalStatus[] = [
  "ACTIVE",
  "ON_HOLD",
  "COMPLETED",
  "CANCELLED",
];

export const validateCreateGoal = (
  req: Request,
): string | null => {
  const {
    title,
    description,
    level,
    targetDate,
  } = req.body;

  if (
    typeof title !== "string" ||
    title.trim().length === 0
  ) {
    return "Goal title is required";
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return "Goal description must be a string";
  }

  if (
    level !== undefined &&
    (
      typeof level !== "string" ||
      !validLevels.includes(level as GoalLevel)
    )
  ) {
    return "Invalid goal level";
  }

  if (
    targetDate !== undefined &&
    typeof targetDate !== "string"
  ) {
    return "Goal targetDate must be a string";
  }

  return null;
};

export const validateUpdateGoal = (
  req: Request,
): string | null => {
  const {
    title,
    description,
    level,
    status,
    targetDate,
    progress,
  } = req.body;

  if (
    title !== undefined &&
    (
      typeof title !== "string" ||
      title.trim().length === 0
    )
  ) {
    return "Goal title cannot be empty";
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return "Goal description must be a string";
  }

  if (
    level !== undefined &&
    (
      typeof level !== "string" ||
      !validLevels.includes(level as GoalLevel)
    )
  ) {
    return "Invalid goal level";
  }

  if (
    status !== undefined &&
    (
      typeof status !== "string" ||
      !validStatuses.includes(
        status as GoalStatus,
      )
    )
  ) {
    return "Invalid goal status";
  }

  if (
    targetDate !== undefined &&
    typeof targetDate !== "string"
  ) {
    return "Goal targetDate must be a string";
  }

  if (progress !== undefined) {
    if (
      typeof progress !== "number" ||
      !Number.isFinite(progress)
    ) {
      return "Goal progress must be a number";
    }

    if (progress < 0 || progress > 100) {
      return "Goal progress must be between 0 and 100";
    }
  }

  return null;
};