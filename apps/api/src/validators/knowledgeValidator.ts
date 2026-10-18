import type { Request } from "express";

export const validateCreateNote = (req: Request): string | null => {
  const { title, content, folderId, tags } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    return "Title is required.";
  }

  if (typeof content !== "string") {
    return "Content is required.";
  }

  if (
    folderId !== undefined &&
    typeof folderId !== "string"
  ) {
    return "folderId must be a string.";
  }

  if (
    tags !== undefined &&
    (!Array.isArray(tags) ||
      !tags.every((tag) => typeof tag === "string"))
  ) {
    return "tags must be an array of strings.";
  }

  return null;
};

export const validateUpdateNote = (req: Request): string | null => {
  const { title, content, folderId, tags } = req.body;

  if (
    title === undefined &&
    content === undefined &&
    folderId === undefined &&
    tags === undefined
  ) {
    return "At least one field is required.";
  }

  if (title !== undefined && typeof title !== "string") {
    return "title must be a string.";
  }

  if (content !== undefined && typeof content !== "string") {
    return "content must be a string.";
  }

  if (
    folderId !== undefined &&
    typeof folderId !== "string"
  ) {
    return "folderId must be a string.";
  }

  if (
    tags !== undefined &&
    (!Array.isArray(tags) ||
      !tags.every((tag) => typeof tag === "string"))
  ) {
    return "tags must be an array of strings.";
  }

  return null;
};