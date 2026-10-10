import { randomUUID } from "node:crypto";
import type {
  CalendarEvent,
  CalendarEventType,
  TimeBlock,
} from "../types/calendar.js";

const calendarEvents: CalendarEvent[] = [];
const timeBlocks: TimeBlock[] = [];

// ─────────────────────────────────────────────
// Calendar Events
// ─────────────────────────────────────────────

export const createCalendarEvent = (
  userId: string,
  title: string,
  description: string | undefined,
  type: CalendarEventType = "PERSONAL",
  startTime: string,
  endTime: string,
  location?: string,
): CalendarEvent => {
  const now = new Date().toISOString();

  const event: CalendarEvent = {
    id: randomUUID(),
    userId,
    title: title.trim(),
    ...(description
      ? { description: description.trim() }
      : {}),
    type,
    startTime,
    endTime,
    ...(location
      ? { location: location.trim() }
      : {}),
    createdAt: now,
    updatedAt: now,
  };

  calendarEvents.push(event);

  return event;
};

export const getCalendarEvents = (
  userId: string,
  from?: string,
  to?: string,
): CalendarEvent[] => {
  return calendarEvents.filter((event) => {
    if (event.userId !== userId) {
      return false;
    }

    const eventStart =
      new Date(event.startTime).getTime();

    const eventEnd =
      new Date(event.endTime).getTime();

    if (from) {
      const fromTime =
        new Date(from).getTime();

      if (eventEnd < fromTime) {
        return false;
      }
    }

    if (to) {
      const toTime =
        new Date(to).getTime();

      if (eventStart > toTime) {
        return false;
      }
    }

    return true;
  });
};

export const getCalendarEventById = (
  userId: string,
  id: string,
): CalendarEvent | undefined => {
  return calendarEvents.find(
    (event) =>
      event.id === id &&
      event.userId === userId,
  );
};

export const updateCalendarEvent = (
  userId: string,
  id: string,
  updates: Partial<
    Pick<
      CalendarEvent,
      | "title"
      | "description"
      | "type"
      | "startTime"
      | "endTime"
      | "location"
    >
  >,
): CalendarEvent | undefined => {
  const event = calendarEvents.find(
    (item) =>
      item.id === id &&
      item.userId === userId,
  );

  if (!event) {
    return undefined;
  }

  if (updates.title !== undefined) {
    event.title = updates.title.trim();
  }

  if (updates.description !== undefined) {
    event.description =
      updates.description.trim();
  }

  if (updates.type !== undefined) {
    event.type = updates.type;
  }

  if (updates.startTime !== undefined) {
    event.startTime = updates.startTime;
  }

  if (updates.endTime !== undefined) {
    event.endTime = updates.endTime;
  }

  if (updates.location !== undefined) {
    event.location =
      updates.location.trim();
  }

  event.updatedAt =
    new Date().toISOString();

  return event;
};

export const deleteCalendarEvent = (
  userId: string,
  id: string,
): boolean => {
  const index = calendarEvents.findIndex(
    (event) =>
      event.id === id &&
      event.userId === userId,
  );

  if (index === -1) {
    return false;
  }

  calendarEvents.splice(index, 1);

  return true;
};

// ─────────────────────────────────────────────
// Time Blocks
// ─────────────────────────────────────────────

export const createTimeBlock = (
  userId: string,
  title: string,
  startTime: string,
  endTime: string,
  description?: string,
): TimeBlock => {
  const now = new Date().toISOString();

  const timeBlock: TimeBlock = {
    id: randomUUID(),
    userId,
    title: title.trim(),
    startTime,
    endTime,
    ...(description
      ? { description: description.trim() }
      : {}),
    createdAt: now,
    updatedAt: now,
  };

  timeBlocks.push(timeBlock);

  return timeBlock;
};

export const getTimeBlocks = (
  userId: string,
  from?: string,
  to?: string,
): TimeBlock[] => {
  return timeBlocks.filter((block) => {
    if (block.userId !== userId) {
      return false;
    }

    const blockStart =
      new Date(block.startTime).getTime();

    const blockEnd =
      new Date(block.endTime).getTime();

    if (from) {
      const fromTime =
        new Date(from).getTime();

      if (blockEnd < fromTime) {
        return false;
      }
    }

    if (to) {
      const toTime =
        new Date(to).getTime();

      if (blockStart > toTime) {
        return false;
      }
    }

    return true;
  });
};

export const getTimeBlockById = (
  userId: string,
  id: string,
): TimeBlock | undefined => {
  return timeBlocks.find(
    (block) =>
      block.id === id &&
      block.userId === userId,
  );
};

export const updateTimeBlock = (
  userId: string,
  id: string,
  updates: Partial<
    Pick<
      TimeBlock,
      | "title"
      | "startTime"
      | "endTime"
      | "description"
    >
  >,
): TimeBlock | undefined => {
  const block = timeBlocks.find(
    (item) =>
      item.id === id &&
      item.userId === userId,
  );

  if (!block) {
    return undefined;
  }

  if (updates.title !== undefined) {
    block.title = updates.title.trim();
  }

  if (updates.startTime !== undefined) {
    block.startTime = updates.startTime;
  }

  if (updates.endTime !== undefined) {
    block.endTime = updates.endTime;
  }

  if (updates.description !== undefined) {
    block.description =
      updates.description.trim();
  }

  block.updatedAt =
    new Date().toISOString();

  return block;
};

export const deleteTimeBlock = (
  userId: string,
  id: string,
): boolean => {
  const index = timeBlocks.findIndex(
    (block) =>
      block.id === id &&
      block.userId === userId,
  );

  if (index === -1) {
    return false;
  }

  timeBlocks.splice(index, 1);

  return true;
};