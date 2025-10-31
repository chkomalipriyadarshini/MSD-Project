import fs from "fs";
import * as pdfParse from "pdf-parse";
import mammoth from "mammoth";
import textract from "textract";

export const extractTextFromFile = async (filePath) => {
  const ext = filePath.split(".").pop().toLowerCase();

  if (ext === "pdf") {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse.default(buffer);
    return data.text;
  }

  if (ext === "docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  if (ext === "txt") {
    return fs.readFileSync(filePath, "utf-8");
  }

  return new Promise((resolve, reject) => {
    textract.fromFileWithPath(filePath, (err, text) => {
      if (err) reject(err);
      else resolve(text);
    });
  });
};
