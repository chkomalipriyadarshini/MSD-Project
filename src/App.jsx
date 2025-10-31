import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FileDropzone from "./components/FileDropzone";
import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", backgroundColor: "#f5f5f5" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Upload</Link>
        <Link to="/results">Results</Link>
      </nav>

      <Routes>
        <Route path="/" element={<FileDropzone />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
