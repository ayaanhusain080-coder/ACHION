import { Router } from "express";
import {
  createGoalController,
  deleteGoalController,
  getGoalByIdController,
  getGoalsController,
  updateGoalController,
} from "../controllers/goalController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", getGoalsController);
router.post("/", createGoalController);
router.get("/:id", getGoalByIdController);
router.patch("/:id", updateGoalController);
router.delete("/:id", deleteGoalController);

export default router;