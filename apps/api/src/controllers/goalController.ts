import type { Request, Response } from "express";
import {
  createGoal,
  deleteGoal,
  getGoalById,
  getGoals,
  updateGoal,
} from "../services/goalService.js";
import {
  validateCreateGoal,
  validateUpdateGoal,
} from "../validators/goalValidator.js";
import type { PublicUser } from "../types/auth.js";

const getGoalId = (
  req: Request,
): string | null => {
  const { id } = req.params;

  if (
    typeof id !== "string" ||
    id.trim().length === 0
  ) {
    return null;
  }

  return id;
};

const getAuthenticatedUser = (
  res: Response,
): PublicUser | null => {
  const user = res.locals.user as
    | PublicUser
    | undefined;

  if (!user) {
    return null;
  }

  return user;
};

export const createGoalController = (
  req: Request,
  res: Response,
) => {
  const validationError =
    validateCreateGoal(req);

  if (validationError) {
    res.status(400).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const goal = createGoal(
    user.id,
    req.body.title,
    req.body.description,
    req.body.level,
    req.body.targetDate,
  );

  res.status(201).json({
    success: true,
    data: goal,
  });
};

export const getGoalsController = (
  _req: Request,
  res: Response,
) => {
  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  res.json({
    success: true,
    data: getGoals(user.id),
  });
};

export const getGoalByIdController = (
  req: Request,
  res: Response,
) => {
  const id = getGoalId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Goal ID is required",
    });
    return;
  }

  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const goal = getGoalById(
    user.id,
    id,
  );

  if (!goal) {
    res.status(404).json({
      success: false,
      message: "Goal not found",
    });
    return;
  }

  res.json({
    success: true,
    data: goal,
  });
};

export const updateGoalController = (
  req: Request,
  res: Response,
) => {
  const validationError =
    validateUpdateGoal(req);

  if (validationError) {
    res.status(400).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const id = getGoalId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Goal ID is required",
    });
    return;
  }

  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const goal = updateGoal(
    user.id,
    id,
    req.body,
  );

  if (!goal) {
    res.status(404).json({
      success: false,
      message: "Goal not found",
    });
    return;
  }

  res.json({
    success: true,
    data: goal,
  });
};

export const deleteGoalController = (
  req: Request,
  res: Response,
) => {
  const id = getGoalId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Goal ID is required",
    });
    return;
  }

  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const deleted = deleteGoal(
    user.id,
    id,
  );

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: "Goal not found",
    });
    return;
  }

  res.json({
    success: true,
    message: "Goal deleted successfully",
  });
};