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

  const goal = createGoal(
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
  res.json({
    success: true,
    data: getGoals(),
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

  const goal = getGoalById(id);

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

  const goal = updateGoal(
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

  const deleted = deleteGoal(id);

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