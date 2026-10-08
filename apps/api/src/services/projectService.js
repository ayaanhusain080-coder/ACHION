import { randomUUID } from "node:crypto";
const projects = [];
export const createProject = (name, description, deadline) => {
    const now = new Date().toISOString();
    const project = {
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
export const getProjects = () => {
    return projects;
};
export const getProjectById = (id) => {
    return projects.find((project) => project.id === id);
};
export const updateProject = (id, updates) => {
    const project = projects.find((item) => item.id === id);
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
export const deleteProject = (id) => {
    const index = projects.findIndex((project) => project.id === id);
    if (index === -1) {
        return false;
    }
    projects.splice(index, 1);
    return true;
};
//# sourceMappingURL=projectService.js.map