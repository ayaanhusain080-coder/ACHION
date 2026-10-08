import { Router } from "express";
import {
  createGoalController,
  deleteGoalController,
  getGoalByIdController,
  getGoalsController,
  updateGoalController,
} from "../controllers/goalController.js";

const router = Router();

router.get("/", getGoalsController);
router.post("/", createGoalController);
router.get("/:id", getGoalByIdController);
router.patch("/:id", updateGoalController);
router.delete("/:id", deleteGoalController);

export default router;