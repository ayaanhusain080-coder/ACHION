import { Router } from "express";
import {
  loginController,
  logoutController,
  meController,
  registerController,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/register",
  registerController,
);

router.post(
  "/login",
  loginController,
);

router.get(
  "/me",
  requireAuth,
  meController,
);

router.post(
  "/logout",
  requireAuth,
  logoutController,
);

export default router;