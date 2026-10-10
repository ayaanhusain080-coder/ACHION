import type { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../services/taskService.js";
import {
  validateCreateTask,
  validateUpdateTask,
} from "../validators/taskValidator.js";
import type { PublicUser } from "../types/auth.js";

const getTaskId = (
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

export const createTaskController = (
  req: Request,
  res: Response,
) => {
  const validationError =
    validateCreateTask(req);

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

  const task = createTask(
    user.id,
    req.body.title,
    req.body.description,
  );

  res.status(201).json({
    success: true,
    data: task,
  });
};

export const getTasksController = (
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
    data: getTasks(user.id),
  });
};

export const getTaskByIdController = (
  req: Request,
  res: Response,
) => {
  const id = getTaskId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Task ID is required",
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

  const task = getTaskById(
    user.id,
    id,
  );

  if (!task) {
    res.status(404).json({
      success: false,
      message: "Task not found",
    });
    return;
  }

  res.json({
    success: true,
    data: task,
  });
};

export const updateTaskController = (
  req: Request,
  res: Response,
) => {
  const validationError =
    validateUpdateTask(req);

  if (validationError) {
    res.status(400).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const id = getTaskId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Task ID is required",
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

  const task = updateTask(
    user.id,
    id,
    req.body,
  );

  if (!task) {
    res.status(404).json({
      success: false,
      message: "Task not found",
    });
    return;
  }

  res.json({
    success: true,
    data: task,
  });
};

export const deleteTaskController = (
  req: Request,
  res: Response,
) => {
  const id = getTaskId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Task ID is required",
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

  const deleted = deleteTask(
    user.id,
    id,
  );

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: "Task not found",
    });
    return;
  }

  res.json({
    success: true,
    message: "Task deleted successfully",
  });
};