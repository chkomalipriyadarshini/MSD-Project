import React, { useEffect, useState } from "react";
import { getAssignments } from "../services/api";

const Results = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAssignments();
        setAssignments(data);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  if (loading) return <p>Loading results...</p>;

  return (
    <div className="results-page">
      <h2>📚 Uploaded Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments uploaded yet.</p>
      ) : (
        <table border="1" style={{ margin: "20px auto", width: "90%" }}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Grammar Score</th>
              <th>Originality</th>
              <th>AI %</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a._id}>
                <td>{a.studentName}</td>
                <td>{a.grammarScore}</td>
                <td>{a.originalityScore}</td>
                <td>{a.aiLikelihood}%</td>
                <td>{a.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Results;
