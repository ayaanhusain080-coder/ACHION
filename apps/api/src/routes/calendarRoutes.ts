import { Router } from "express";
import {
  createCalendarEventController,
  createTimeBlockController,
  deleteCalendarEventController,
  deleteTimeBlockController,
  getCalendarEventByIdController,
  getCalendarEventsController,
  getTimeBlockByIdController,
  getTimeBlocksController,
  updateCalendarEventController,
  updateTimeBlockController,
} from "../controllers/calendarController.js";

const router = Router();

// Calendar Events
router.get("/events", getCalendarEventsController);
router.post("/events", createCalendarEventController);
router.get(
  "/events/:id",
  getCalendarEventByIdController,
);
router.patch(
  "/events/:id",
  updateCalendarEventController,
);
router.delete(
  "/events/:id",
  deleteCalendarEventController,
);

// Time Blocks
router.get(
  "/time-blocks",
  getTimeBlocksController,
);
router.post(
  "/time-blocks",
  createTimeBlockController,
);
router.get(
  "/time-blocks/:id",
  getTimeBlockByIdController,
);
router.patch(
  "/time-blocks/:id",
  updateTimeBlockController,
);
router.delete(
  "/time-blocks/:id",
  deleteTimeBlockController,
);

export default router;