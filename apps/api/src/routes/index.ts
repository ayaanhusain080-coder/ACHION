import { Router } from "express";
import authRoutes from "./authRoutes.js";
import goalRoutes from "./goalRoutes.js";
import projectRoutes from "./projectRoutes.js";
import taskRoutes from "./taskRoutes.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "ACHION API is running",
  });
});

router.use("/auth", authRoutes);

router.use("/tasks", requireAuth, taskRoutes);
router.use(
  "/projects",
  requireAuth,
  projectRoutes,
);
router.use("/goals", requireAuth, goalRoutes);

export default router;