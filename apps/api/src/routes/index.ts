import { Router } from "express";
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

export default router;