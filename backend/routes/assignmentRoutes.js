import express from "express";
import multer from "multer";
import { uploadAssignment, getAssignments } from "../controllers/assignmentController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadAssignment);
router.get("/", getAssignments);

export default router;
