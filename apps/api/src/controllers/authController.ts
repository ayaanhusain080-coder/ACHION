import type { Request, Response } from "express";
import {
  loginUser,
  registerUser,
} from "../services/authService.js";
import {
  validateLogin,
  validateRegister,
} from "../validators/authValidator.js";

export const registerController = (
  req: Request,
  res: Response,
) => {
  const validationError =
    validateRegister(req);

  if (validationError) {
    res.status(400).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const result = registerUser(
    req.body.name,
    req.body.email,
    req.body.password,
  );

  if (!result) {
    res.status(409).json({
      success: false,
      message:
        "A user with this email already exists",
    });
    return;
  }

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const loginController = (
  req: Request,
  res: Response,
) => {
  const validationError =
    validateLogin(req);

  if (validationError) {
    res.status(400).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const result = loginUser(
    req.body.email,
    req.body.password,
  );

  if (!result) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
    return;
  }

  res.json({
    success: true,
    data: result,
  });
};