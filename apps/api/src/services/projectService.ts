import { randomUUID } from "node:crypto";
import type { Project } from "../types/project.js";

const projects: Project[] = [];

export const createProject = (
  userId: string,
  name: string,
  description?: string,
  deadline?: string,
): Project => {
  const now = new Date().toISOString();

  const project: Project = {
    id: randomUUID(),
    userId,
    name: name.trim(),
    ...(description
      ? { description: description.trim() }
      : {}),
    status: "PLANNED",
    ...(deadline ? { deadline } : {}),
    progress: 0,
    createdAt: now,
    updatedAt: now,
  };

  projects.push(project);

  return project;
};

export const getProjects = (
  userId: string,
): Project[] => {
  return projects.filter(
    (project) => project.userId === userId,
  );
};

export const getProjectById = (
  userId: string,
  id: string,
): Project | undefined => {
  return projects.find(
    (project) =>
      project.id === id &&
      project.userId === userId,
  );
};

export const updateProject = (
  userId: string,
  id: string,
  updates: Partial<
    Pick<
      Project,
      | "name"
      | "description"
      | "status"
      | "deadline"
      | "progress"
    >
  >,
): Project | undefined => {
  const project = projects.find(
    (item) =>
      item.id === id &&
      item.userId === userId,
  );

  if (!project) {
    return undefined;
  }

  if (updates.name !== undefined) {
    project.name = updates.name.trim();
  }

  if (updates.description !== undefined) {
    project.description =
      updates.description.trim();
  }

  if (updates.status !== undefined) {
    project.status = updates.status;
  }

  if (updates.deadline !== undefined) {
    project.deadline = updates.deadline;
  }

  if (updates.progress !== undefined) {
    project.progress = updates.progress;
  }

  project.updatedAt =
    new Date().toISOString();

  return project;
};

export const deleteProject = (
  userId: string,
  id: string,
): boolean => {
  const index = projects.findIndex(
    (project) =>
      project.id === id &&
      project.userId === userId,
  );

  if (index === -1) {
    return false;
  }

  projects.splice(index, 1);

  return true;
};