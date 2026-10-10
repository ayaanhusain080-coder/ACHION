export type CalendarEventType =
  | "PERSONAL"
  | "WORK"
  | "MEETING"
  | "TASK"
  | "REMINDER"
  | "OTHER";

export interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  description?: string;
  type: CalendarEventType;
  startTime: string;
  endTime: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimeBlock {
  id: string;
  userId: string;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}