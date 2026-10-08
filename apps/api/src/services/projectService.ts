import { randomUUID } from "node:crypto";
import type { Project } from "../types/project.js";

const projects: Project[] = [];

export const createProject = (
  name: string,
  description?: string,
  deadline?: string,
): Project => {
  const now = new Date().toISOString();

  const project: Project = {
    id: randomUUID(),
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

export const getProjects = (): Project[] => {
  return projects;
};

export const getProjectById = (
  id: string,
): Project | undefined => {
  return projects.find(
    (project) => project.id === id,
  );
};

export const updateProject = (
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
    (item) => item.id === id,
  );

  if (!project) {
    return undefined;
  }

  if (updates.name !== undefined) {
    project.name = updates.name.trim();
  }

  if (updates.description !== undefined) {
    project.description = updates.description.trim();
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

  project.updatedAt = new Date().toISOString();

  return project;
};

export const deleteProject = (
  id: string,
): boolean => {
  const index = projects.findIndex(
    (project) => project.id === id,
  );

  if (index === -1) {
    return false;
  }

  projects.splice(index, 1);

  return true;
};