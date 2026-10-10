import type { Response } from "express";
import type { PublicUser } from "../types/auth.js";

export const getCurrentUser = (
  res: Response,
): PublicUser | null => {
  const user = res.locals.user;

  if (!user) {
    return null;
  }

  return user as PublicUser;
};