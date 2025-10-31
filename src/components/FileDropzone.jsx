import React, { useState } from "react";
import { uploadAssignment } from "../services/api";

const FileDropzone = () => {
  const [studentName, setStudentName] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!studentName || !file) {
      setMessage("Please enter your name and choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("studentName", studentName);
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await uploadAssignment(formData);
      setMessage(response.message);
      setResult(response.result);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>📄 Upload Assignment</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Enter your name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && <p>{message}</p>}

      {result && (
        <div className="result-box">
          <h3>📊 Analysis Result</h3>
          <p><strong>Name:</strong> {result.studentName}</p>
          <p><strong>Grammar Score:</strong> {result.grammarScore}</p>
          <p><strong>Originality Score:</strong> {result.originalityScore}</p>
          <p><strong>AI Likelihood:</strong> {result.aiLikelihood}%</p>
          <p><strong>Feedback:</strong> {result.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
