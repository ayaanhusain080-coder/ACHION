import type { Request } from "express";

export const validateRegister = (
  req: Request,
): string | null => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (
    typeof name !== "string" ||
    name.trim().length === 0
  ) {
    return "Name is required";
  }

  if (name.trim().length > 100) {
    return "Name must be 100 characters or less";
  }

  if (
    typeof email !== "string" ||
    email.trim().length === 0
  ) {
    return "Email is required";
  }

  if (email.trim().length > 255) {
    return "Email must be 255 characters or less";
  }

  if (
    typeof password !== "string" ||
    password.length === 0
  ) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (password.length > 128) {
    return "Password must be 128 characters or less";
  }

  return null;
};

export const validateLogin = (
  req: Request,
): string | null => {
  const {
    email,
    password,
  } = req.body;

  if (
    typeof email !== "string" ||
    email.trim().length === 0
  ) {
    return "Email is required";
  }

  if (email.trim().length > 255) {
    return "Email must be 255 characters or less";
  }

  if (
    typeof password !== "string" ||
    password.length === 0
  ) {
    return "Password is required";
  }

  if (password.length > 128) {
    return "Password must be 128 characters or less";
  }

  return null;
};