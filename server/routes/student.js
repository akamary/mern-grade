import express from "express";
import {
  getStudents,
  createStudent,
  deleteStudent,
  getCurrStudent,
} from "../controllers/student.js";
import student from "../models/student.js";

const router = express.Router();

router.get("/:studentName", getCurrStudent);
router.get("/", getStudents);
router.post("/:studentName", createStudent);
router.delete("/:id", deleteStudent);

export default router;
