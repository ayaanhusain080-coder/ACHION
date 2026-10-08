import { Router } from "express";
import goalRoutes from "./goalRoutes.js";
import projectRoutes from "./projectRoutes.js";
import taskRoutes from "./taskRoutes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "ACHION API is running",
  });
});

router.use("/tasks", taskRoutes);
router.use("/projects", projectRoutes);
router.use("/goals", goalRoutes);

export default router;