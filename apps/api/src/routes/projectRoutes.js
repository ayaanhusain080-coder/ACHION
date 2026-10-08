import { Router } from "express";
import { createProjectController, deleteProjectController, getProjectByIdController, getProjectsController, updateProjectController, } from "../controllers/projectController.js";
const router = Router();
router.get("/", getProjectsController);
router.post("/", createProjectController);
router.get("/:id", getProjectByIdController);
router.patch("/:id", updateProjectController);
router.delete("/:id", deleteProjectController);
export default router;
//# sourceMappingURL=projectRoutes.js.map