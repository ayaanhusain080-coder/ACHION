import type { Project } from "../types/project.js";
export declare const createProject: (name: string, description?: string, deadline?: string) => Project;
export declare const getProjects: () => Project[];
export declare const getProjectById: (id: string) => Project | undefined;
export declare const updateProject: (id: string, updates: Partial<Pick<Project, "name" | "description" | "status" | "deadline" | "progress">>) => Project | undefined;
export declare const deleteProject: (id: string) => boolean;
//# sourceMappingURL=projectService.d.ts.map