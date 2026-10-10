import { randomUUID } from "node:crypto";
import type { Goal, GoalLevel } from "../types/goal.js";

const goals: Goal[] = [];

export const createGoal = (
  userId: string,
  title: string,
  description?: string,
  level: GoalLevel = "GOAL",
  targetDate?: string,
): Goal => {
  const now = new Date().toISOString();

  const goal: Goal = {
    id: randomUUID(),
    userId,
    title: title.trim(),
    ...(description
      ? { description: description.trim() }
      : {}),
    level,
    status: "ACTIVE",
    ...(targetDate ? { targetDate } : {}),
    progress: 0,
    createdAt: now,
    updatedAt: now,
  };

  goals.push(goal);

  return goal;
};

export const getGoals = (
  userId: string,
): Goal[] => {
  return goals.filter(
    (goal) => goal.userId === userId,
  );
};

export const getGoalById = (
  userId: string,
  id: string,
): Goal | undefined => {
  return goals.find(
    (goal) =>
      goal.id === id &&
      goal.userId === userId,
  );
};

export const updateGoal = (
  userId: string,
  id: string,
  updates: Partial<
    Pick<
      Goal,
      | "title"
      | "description"
      | "level"
      | "status"
      | "targetDate"
      | "progress"
    >
  >,
): Goal | undefined => {
  const goal = goals.find(
    (item) =>
      item.id === id &&
      item.userId === userId,
  );

  if (!goal) {
    return undefined;
  }

  if (updates.title !== undefined) {
    goal.title = updates.title.trim();
  }

  if (updates.description !== undefined) {
    goal.description =
      updates.description.trim();
  }

  if (updates.level !== undefined) {
    goal.level = updates.level;
  }

  if (updates.status !== undefined) {
    goal.status = updates.status;
  }

  if (updates.targetDate !== undefined) {
    goal.targetDate = updates.targetDate;
  }

  if (updates.progress !== undefined) {
    goal.progress = updates.progress;
  }

  goal.updatedAt =
    new Date().toISOString();

  return goal;
};

export const deleteGoal = (
  userId: string,
  id: string,
): boolean => {
  const index = goals.findIndex(
    (goal) =>
      goal.id === id &&
      goal.userId === userId,
  );

  if (index === -1) {
    return false;
  }

  goals.splice(index, 1);

  return true;
};