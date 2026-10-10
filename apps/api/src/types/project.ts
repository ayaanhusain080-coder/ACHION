export type ProjectStatus =
  | "PLANNED"
  | "IN_PROGRESS"
  | "ON_HOLD"
  | "COMPLETED"
  | "CANCELLED";

export interface Project {
  id: string;
  userId: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  deadline?: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}