import { Router } from "express";
import {
  createNoteController,
  deleteNoteController,
  getNoteByIdController,
  getNotesController,
  searchNotesController,
  updateNoteController,
} from "../controllers/knowledgeController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", getNotesController);
router.get("/search", searchNotesController);
router.post("/", createNoteController);
router.get("/:id", getNoteByIdController);
router.patch("/:id", updateNoteController);
router.delete("/:id", deleteNoteController);

export default router;