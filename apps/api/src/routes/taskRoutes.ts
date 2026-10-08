import { Router } from "express";
import {
  createTaskController,
  getTasksController,
} from "../controllers/taskController.js";

const router = Router();

router.get("/", getTasksController);
router.post("/", createTaskController);

export default router;