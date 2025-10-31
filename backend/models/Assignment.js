import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  filePath: { type: String, required: true },
  grammarScore: Number,
  originalityScore: Number,
  aiLikelihood: Number,
  readability: String,
  feedback: String,
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Assignment", assignmentSchema);
