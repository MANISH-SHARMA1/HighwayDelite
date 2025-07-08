import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNote,
} from "../controllers/notesController";
import requireUser from "../middlewares/requireUser";

const router = Router();

router.post("/add", requireUser, createNote);
router.get("/get", requireUser, getNote);
router.delete("/delete", requireUser, deleteNote);

export default router;
