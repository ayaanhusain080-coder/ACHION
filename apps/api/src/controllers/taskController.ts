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

const getTaskId = (req: Request): string | null => {
  const { id } = req.params;

  if (typeof id !== "string" || id.trim().length === 0) {
    return null;
  }

  return id;
};

export const createTaskController = (
  req: Request,
  res: Response,
) => {
  const validationError = validateCreateTask(req);

  if (validationError) {
    res.status(400).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const task = createTask(
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
  res.json({
    success: true,
    data: getTasks(),
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

  const task = getTaskById(id);

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
  const validationError = validateUpdateTask(req);

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

  const task = updateTask(id, req.body);

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

  const deleted = deleteTask(id);

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