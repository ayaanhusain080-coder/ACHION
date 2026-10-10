import type { Request } from "express";
import type { CalendarEventType } from "../types/calendar.js";

const validEventTypes: CalendarEventType[] = [
  "PERSONAL",
  "WORK",
  "MEETING",
  "TASK",
  "REMINDER",
  "OTHER",
];

const isValidDate = (
  value: unknown,
): value is string => {
  if (typeof value !== "string") {
    return false;
  }

  const date = new Date(value);

  return !Number.isNaN(date.getTime());
};

const validateTimeRange = (
  startTime: string,
  endTime: string,
): string | null => {
  if (
    new Date(endTime).getTime() <=
    new Date(startTime).getTime()
  ) {
    return "End time must be after start time";
  }

  return null;
};

export const validateCreateCalendarEvent = (
  req: Request,
): string | null => {
  const {
    title,
    description,
    type,
    startTime,
    endTime,
    location,
  } = req.body;

  if (
    typeof title !== "string" ||
    title.trim().length === 0
  ) {
    return "Event title is required";
  }

  if (title.trim().length > 200) {
    return "Event title must be 200 characters or less";
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return "Event description must be a string";
  }

  if (
    type !== undefined &&
    (
      typeof type !== "string" ||
      !validEventTypes.includes(
        type as CalendarEventType,
      )
    )
  ) {
    return "Invalid calendar event type";
  }

  if (!isValidDate(startTime)) {
    return "Valid start time is required";
  }

  if (!isValidDate(endTime)) {
    return "Valid end time is required";
  }

  const timeError = validateTimeRange(
    startTime,
    endTime,
  );

  if (timeError) {
    return timeError;
  }

  if (
    location !== undefined &&
    typeof location !== "string"
  ) {
    return "Event location must be a string";
  }

  return null;
};

export const validateUpdateCalendarEvent = (
  req: Request,
): string | null => {
  const {
    title,
    description,
    type,
    startTime,
    endTime,
    location,
  } = req.body;

  if (
    title !== undefined &&
    (
      typeof title !== "string" ||
      title.trim().length === 0
    )
  ) {
    return "Event title cannot be empty";
  }

  if (
    title !== undefined &&
    title.trim().length > 200
  ) {
    return "Event title must be 200 characters or less";
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return "Event description must be a string";
  }

  if (
    type !== undefined &&
    (
      typeof type !== "string" ||
      !validEventTypes.includes(
        type as CalendarEventType,
      )
    )
  ) {
    return "Invalid calendar event type";
  }

  if (
    startTime !== undefined &&
    !isValidDate(startTime)
  ) {
    return "Start time must be a valid date";
  }

  if (
    endTime !== undefined &&
    !isValidDate(endTime)
  ) {
    return "End time must be a valid date";
  }

  if (
    startTime !== undefined &&
    endTime !== undefined
  ) {
    const timeError = validateTimeRange(
      startTime,
      endTime,
    );

    if (timeError) {
      return timeError;
    }
  }

  if (
    location !== undefined &&
    typeof location !== "string"
  ) {
    return "Event location must be a string";
  }

  return null;
};

export const validateCreateTimeBlock = (
  req: Request,
): string | null => {
  const {
    title,
    startTime,
    endTime,
    description,
  } = req.body;

  if (
    typeof title !== "string" ||
    title.trim().length === 0
  ) {
    return "Time block title is required";
  }

  if (title.trim().length > 200) {
    return "Time block title must be 200 characters or less";
  }

  if (!isValidDate(startTime)) {
    return "Valid start time is required";
  }

  if (!isValidDate(endTime)) {
    return "Valid end time is required";
  }

  const timeError = validateTimeRange(
    startTime,
    endTime,
  );

  if (timeError) {
    return timeError;
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return "Time block description must be a string";
  }

  return null;
};

export const validateUpdateTimeBlock = (
  req: Request,
): string | null => {
  const {
    title,
    startTime,
    endTime,
    description,
  } = req.body;

  if (
    title !== undefined &&
    (
      typeof title !== "string" ||
      title.trim().length === 0
    )
  ) {
    return "Time block title cannot be empty";
  }

  if (
    title !== undefined &&
    title.trim().length > 200
  ) {
    return "Time block title must be 200 characters or less";
  }

  if (
    startTime !== undefined &&
    !isValidDate(startTime)
  ) {
    return "Start time must be a valid date";
  }

  if (
    endTime !== undefined &&
    !isValidDate(endTime)
  ) {
    return "End time must be a valid date";
  }

  if (
    startTime !== undefined &&
    endTime !== undefined
  ) {
    const timeError = validateTimeRange(
      startTime,
      endTime,
    );

    if (timeError) {
      return timeError;
    }
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return "Time block description must be a string";
  }

  return null;
};