import type { Request, Response } from "express";
import {
  createCalendarEvent,
  createTimeBlock,
  deleteCalendarEvent,
  deleteTimeBlock,
  getCalendarEventById,
  getCalendarEvents,
  getTimeBlockById,
  getTimeBlocks,
  updateCalendarEvent,
  updateTimeBlock,
} from "../services/calendarService.js";
import {
  validateCreateCalendarEvent,
  validateCreateTimeBlock,
  validateUpdateCalendarEvent,
  validateUpdateTimeBlock,
} from "../validators/calendarValidator.js";
import type { PublicUser } from "../types/auth.js";

const getId = (
  req: Request,
): string | null => {
  const { id } = req.params;

  if (
    typeof id !== "string" ||
    id.trim().length === 0
  ) {
    return null;
  }

  return id;
};

const getAuthenticatedUser = (
  res: Response,
): PublicUser | null => {
  const user = res.locals.user as
    | PublicUser
    | undefined;

  if (!user) {
    return null;
  }

  return user;
};

// ─────────────────────────────────────────────
// Calendar Events
// ─────────────────────────────────────────────

export const createCalendarEventController = (
  req: Request,
  res: Response,
) => {
  const validationError =
    validateCreateCalendarEvent(req);

  if (validationError) {
    res.status(400).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const event = createCalendarEvent(
    user.id,
    req.body.title,
    req.body.description,
    req.body.type,
    req.body.startTime,
    req.body.endTime,
    req.body.location,
  );

  res.status(201).json({
    success: true,
    data: event,
  });
};

export const getCalendarEventsController = (
  req: Request,
  res: Response,
) => {
  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const from =
    typeof req.query.from === "string"
      ? req.query.from
      : undefined;

  const to =
    typeof req.query.to === "string"
      ? req.query.to
      : undefined;

  res.json({
    success: true,
    data: getCalendarEvents(
      user.id,
      from,
      to,
    ),
  });
};

export const getCalendarEventByIdController = (
  req: Request,
  res: Response,
) => {
  const id = getId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Calendar event ID is required",
    });
    return;
  }

  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const event =
    getCalendarEventById(
      user.id,
      id,
    );

  if (!event) {
    res.status(404).json({
      success: false,
      message: "Calendar event not found",
    });
    return;
  }

  res.json({
    success: true,
    data: event,
  });
};

export const updateCalendarEventController = (
  req: Request,
  res: Response,
) => {
  const validationError =
    validateUpdateCalendarEvent(req);

  if (validationError) {
    res.status(400).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const id = getId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Calendar event ID is required",
    });
    return;
  }

  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const event =
    updateCalendarEvent(
      user.id,
      id,
      req.body,
    );

  if (!event) {
    res.status(404).json({
      success: false,
      message: "Calendar event not found",
    });
    return;
  }

  res.json({
    success: true,
    data: event,
  });
};

export const deleteCalendarEventController = (
  req: Request,
  res: Response,
) => {
  const id = getId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Calendar event ID is required",
    });
    return;
  }

  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const deleted =
    deleteCalendarEvent(
      user.id,
      id,
    );

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: "Calendar event not found",
    });
    return;
  }

  res.json({
    success: true,
    message:
      "Calendar event deleted successfully",
  });
};

// ─────────────────────────────────────────────
// Time Blocks
// ─────────────────────────────────────────────

export const createTimeBlockController = (
  req: Request,
  res: Response,
) => {
  const validationError =
    validateCreateTimeBlock(req);

  if (validationError) {
    res.status(400).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const block = createTimeBlock(
    user.id,
    req.body.title,
    req.body.startTime,
    req.body.endTime,
    req.body.description,
  );

  res.status(201).json({
    success: true,
    data: block,
  });
};

export const getTimeBlocksController = (
  req: Request,
  res: Response,
) => {
  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const from =
    typeof req.query.from === "string"
      ? req.query.from
      : undefined;

  const to =
    typeof req.query.to === "string"
      ? req.query.to
      : undefined;

  res.json({
    success: true,
    data: getTimeBlocks(
      user.id,
      from,
      to,
    ),
  });
};

export const getTimeBlockByIdController = (
  req: Request,
  res: Response,
) => {
  const id = getId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Time block ID is required",
    });
    return;
  }

  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const block =
    getTimeBlockById(
      user.id,
      id,
    );

  if (!block) {
    res.status(404).json({
      success: false,
      message: "Time block not found",
    });
    return;
  }

  res.json({
    success: true,
    data: block,
  });
};

export const updateTimeBlockController = (
  req: Request,
  res: Response,
) => {
  const validationError =
    validateUpdateTimeBlock(req);

  if (validationError) {
    res.status(400).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const id = getId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Time block ID is required",
    });
    return;
  }

  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const block =
    updateTimeBlock(
      user.id,
      id,
      req.body,
    );

  if (!block) {
    res.status(404).json({
      success: false,
      message: "Time block not found",
    });
    return;
  }

  res.json({
    success: true,
    data: block,
  });
};

export const deleteTimeBlockController = (
  req: Request,
  res: Response,
) => {
  const id = getId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Time block ID is required",
    });
    return;
  }

  const user =
    getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const deleted =
    deleteTimeBlock(
      user.id,
      id,
    );

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: "Time block not found",
    });
    return;
  }

  res.json({
    success: true,
    message:
      "Time block deleted successfully",
  });
};