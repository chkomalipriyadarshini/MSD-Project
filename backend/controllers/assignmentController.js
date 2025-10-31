import Assignment from "../models/Assignment.js";
import { extractTextFromFile } from "../utils/fileParser.js";
import { analyzeText } from "../utils/nlpUtils.js";
import { checkPlagiarism } from "../utils/plagiarismUtils.js";

/**
 * Upload & analyze assignment
 */
export const uploadAssignment = async (req, res) => {
  try {
    console.log("📥 Received upload request");
    console.log("👤 Student Name:", req.body.studentName);
    console.log("📁 File Info:", req.file);

    const { studentName } = req.body;

    if (!studentName || !req.file) {
      console.log("❌ Missing name or file");
      return res.status(400).json({ message: "Student name and file are required." });
    }

    const filePath = req.file.path;
    console.log("🧩 File path:", filePath);

    const extractedText = await extractTextFromFile(filePath);
    console.log("📝 Extracted text length:", extractedText?.length || 0);

    if (!extractedText || extractedText.trim().length === 0) {
      console.log("❌ No text extracted from file");
      return res.status(400).json({ message: "Could not extract text from the uploaded file." });
    }

    const cleanedText = extractedText.replace(/\s+/g, " ").trim();
    console.log("🧹 Cleaned text length:", cleanedText.length);

    const nlpResults = await analyzeText(cleanedText);
    console.log("💡 NLP Results:", nlpResults);

    const plagiarismResults = await checkPlagiarism(cleanedText);
    console.log("📊 Plagiarism Results:", plagiarismResults);

    const newAssignment = await Assignment.create({
      studentName,
      filePath,
      ...nlpResults,
      ...plagiarismResults,
    });

    console.log("✅ Assignment saved:", newAssignment._id);

    res.status(201).json({
      message: "Assignment uploaded and analyzed successfully!",
      textPreview: cleanedText.slice(0, 500) + "...",
      result: newAssignment,
    });
  } catch (error) {
    console.error("❌ Error in uploadAssignment:", error);
    res.status(500).json({ message: "Server error while processing assignment." });
  }
};

/**
 * Get all assignments
 */
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ uploadedAt: -1 });
    res.status(200).json(assignments);
  } catch (error) {
    console.error("❌ Error in getAssignments:", error);
    res.status(500).json({ message: "Error fetching assignments." });
  }
};
