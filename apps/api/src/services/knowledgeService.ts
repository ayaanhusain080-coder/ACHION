import { randomUUID } from "node:crypto";
import type { Note } from "../types/knowledge.js";

const notes: Note[] = [];

export const createNote = (
  userId: string,
  title: string,
  content: string,
  folderId?: string,
  tags: string[] = [],
): Note => {
  const now = new Date().toISOString();

  const note: Note = {
    id: randomUUID(),
    userId,
    title: title.trim(),
    content,
    ...(folderId ? { folderId } : {}),
    tags,
    createdAt: now,
    updatedAt: now,
  };

  notes.push(note);

  return note;
};

export const getNotes = (userId: string): Note[] => {
  return notes.filter((note) => note.userId === userId);
};

export const getNoteById = (
  userId: string,
  id: string,
): Note | undefined => {
  return notes.find(
    (note) => note.id === id && note.userId === userId,
  );
};

export const searchNotes = (
  userId: string,
  query: string,
): Note[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return getNotes(userId);
  }

  return notes.filter((note) => {
    if (note.userId !== userId) {
      return false;
    }

    return (
      note.title.toLowerCase().includes(normalizedQuery) ||
      note.content.toLowerCase().includes(normalizedQuery) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(normalizedQuery),
      )
    );
  });
};

export const updateNote = (
  userId: string,
  id: string,
  updates: Partial<
    Pick<Note, "title" | "content" | "folderId" | "tags">
  >,
): Note | undefined => {
  const note = notes.find(
    (item) => item.id === id && item.userId === userId,
  );

  if (!note) {
    return undefined;
  }

  if (updates.title !== undefined) {
    note.title = updates.title.trim();
  }

  if (updates.content !== undefined) {
    note.content = updates.content;
  }

  if (updates.folderId !== undefined) {
    note.folderId = updates.folderId;
  }

  if (updates.tags !== undefined) {
    note.tags = updates.tags;
  }

  note.updatedAt = new Date().toISOString();

  return note;
};

export const deleteNote = (
  userId: string,
  id: string,
): boolean => {
  const index = notes.findIndex(
    (note) => note.id === id && note.userId === userId,
  );

  if (index === -1) {
    return false;
  }

  notes.splice(index, 1);

  return true;
};