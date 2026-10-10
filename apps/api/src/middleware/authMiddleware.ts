import type {
  NextFunction,
  Request,
  Response,
} from "express";
import { getUserByToken } from "../services/authService.js";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization =
    req.headers.authorization;

  if (
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ")
  ) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const token =
    authorization.slice("Bearer ".length).trim();

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const user = getUserByToken(token);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
    return;
  }

  res.locals.user = user;

  next();
};