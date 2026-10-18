import type { Request, Response } from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  searchNotes,
  updateNote,
} from "../services/knowledgeService.js";
import {
  validateCreateNote,
  validateUpdateNote,
} from "../validators/knowledgeValidator.js";

type AuthenticatedUser = {
  id: string;
};

const getAuthenticatedUser = (
  res: Response,
): AuthenticatedUser | null => {
  const user = res.locals.user;

  if (!user || typeof user.id !== "string") {
    return null;
  }

  return user;
};

const getRouteId = (
  req: Request,
): string | null => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return null;
  }

  return id;
};

export const createNoteController = (
  req: Request,
  res: Response,
): void => {
  const user = getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
    return;
  }

  const validationError = validateCreateNote(req);

  if (validationError) {
    res.status(400).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const { title, content, folderId, tags } = req.body;

  const note = createNote(
    user.id,
    title,
    content,
    folderId,
    tags,
  );

  res.status(201).json({
    success: true,
    data: note,
  });
};

export const getNotesController = (
  _req: Request,
  res: Response,
): void => {
  const user = getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
    return;
  }

  res.json({
    success: true,
    data: getNotes(user.id),
  });
};

export const searchNotesController = (
  req: Request,
  res: Response,
): void => {
  const user = getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
    return;
  }

  const query =
    typeof req.query.q === "string"
      ? req.query.q
      : "";

  res.json({
    success: true,
    data: searchNotes(user.id, query),
  });
};

export const getNoteByIdController = (
  req: Request,
  res: Response,
): void => {
  const user = getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
    return;
  }

  const id = getRouteId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Note ID is required.",
    });
    return;
  }

  const note = getNoteById(user.id, id);

  if (!note) {
    res.status(404).json({
      success: false,
      message: "Note not found.",
    });
    return;
  }

  res.json({
    success: true,
    data: note,
  });
};

export const updateNoteController = (
  req: Request,
  res: Response,
): void => {
  const user = getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
    return;
  }

  const id = getRouteId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Note ID is required.",
    });
    return;
  }

  const validationError = validateUpdateNote(req);

  if (validationError) {
    res.status(400).json({
      success: false,
      message: validationError,
    });
    return;
  }

  const note = updateNote(
    user.id,
    id,
    req.body,
  );

  if (!note) {
    res.status(404).json({
      success: false,
      message: "Note not found.",
    });
    return;
  }

  res.json({
    success: true,
    data: note,
  });
};

export const deleteNoteController = (
  req: Request,
  res: Response,
): void => {
  const user = getAuthenticatedUser(res);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
    return;
  }

  const id = getRouteId(req);

  if (!id) {
    res.status(400).json({
      success: false,
      message: "Note ID is required.",
    });
    return;
  }

  const deleted = deleteNote(
    user.id,
    id,
  );

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: "Note not found.",
    });
    return;
  }

  res.json({
    success: true,
    message: "Note deleted successfully.",
  });
};