import type { Request, Response } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../services/projectService.js";
import {
  validateCreateProject,
  validateUpdateProject,
} from "../validators/projectValidator.js";
import type { PublicUser } from "../types/auth.js";

const getProjectId = (
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

export const createProjectController = (
  req: Request,
  res: Response,
) => {
  const validationError =
    validateCreateProject(req);

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

  const project = createProject(
    user.id,
    req.body.name,
    req.body.description,
    req.body.deadline,
  );

  res.status(201).json({
    success: true,
    data: project,
  });
};

export const getProjectsController = (
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
    data: getProjects(user.id),
  });
};

export const getProjectByIdController = (
  req: Request,
  res: Response,
) => {
  const id = getProjectId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Project ID is required",
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

  const project = getProjectById(
    user.id,
    id,
  );

  if (!project) {
    res.status(404).json({
      success: false,
      message: "Project not found",
    });
    return;
  }

  res.json({
    success: true,
    data: project,
  });
};

export const updateProjectController = (
  req: Request,
  res: Response,
) => {
  const validationError =
    validateUpdateProject(req);

  if (validationError) {
    res.status(400).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const id = getProjectId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Project ID is required",
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

  const project = updateProject(
    user.id,
    id,
    req.body,
  );

  if (!project) {
    res.status(404).json({
      success: false,
      message: "Project not found",
    });
    return;
  }

  res.json({
    success: true,
    data: project,
  });
};

export const deleteProjectController = (
  req: Request,
  res: Response,
) => {
  const id = getProjectId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Project ID is required",
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

  const deleted = deleteProject(
    user.id,
    id,
  );

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: "Project not found",
    });
    return;
  }

  res.json({
    success: true,
    message: "Project deleted successfully",
  });
};