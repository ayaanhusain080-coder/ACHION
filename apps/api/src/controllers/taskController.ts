import type { Request, Response } from "express";
import {
  createTask,
  getTasks,
} from "../services/taskService.js";
import { validateCreateTask } from "../validators/taskValidator.js";

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