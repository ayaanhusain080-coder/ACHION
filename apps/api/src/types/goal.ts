export type GoalStatus =
  | "ACTIVE"
  | "ON_HOLD"
  | "COMPLETED"
  | "CANCELLED";

export type GoalLevel =
  | "VISION"
  | "GOAL";

export interface Goal {
  id: string;
  title: string;
  description?: string;
  level: GoalLevel;
  status: GoalStatus;
  targetDate?: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}