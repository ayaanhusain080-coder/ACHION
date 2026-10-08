import { createProject, deleteProject, getProjectById, getProjects, updateProject, } from "../services/projectService.js";
import { validateCreateProject, validateUpdateProject, } from "../validators/projectValidator.js";
const getProjectId = (req) => {
    const { id } = req.params;
    if (typeof id !== "string" ||
        id.trim().length === 0) {
        return null;
    }
    return id;
};
export const createProjectController = (req, res) => {
    const validationError = validateCreateProject(req);
    if (validationError) {
        res.status(400).json({
            success: false,
            message: validationError,
        });
        return;
    }
    const project = createProject(req.body.name, req.body.description, req.body.deadline);
    res.status(201).json({
        success: true,
        data: project,
    });
};
export const getProjectsController = (_req, res) => {
    res.json({
        success: true,
        data: getProjects(),
    });
};
export const getProjectByIdController = (req, res) => {
    const id = getProjectId(req);
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Project ID is required",
        });
        return;
    }
    const project = getProjectById(id);
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
export const updateProjectController = (req, res) => {
    const validationError = validateUpdateProject(req);
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
    const project = updateProject(id, req.body);
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
export const deleteProjectController = (req, res) => {
    const id = getProjectId(req);
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Project ID is required",
        });
        return;
    }
    const deleted = deleteProject(id);
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
//# sourceMappingURL=projectController.js.map