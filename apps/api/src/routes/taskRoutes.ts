import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getTaskByIdController,
  getTasksController,
  updateTaskController,
} from "../controllers/taskController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", getTasksController);
router.post("/", createTaskController);
router.get("/:id", getTaskByIdController);
router.patch("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;