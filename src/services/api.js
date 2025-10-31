import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Upload assignment
export const uploadAssignment = async (formData) => {
  try {
    const res = await api.post("/assignments/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err.response?.data || { message: "Server error" };
  }
};

// Get all assignments
export const getAssignments = async () => {
  try {
    const res = await api.get("/assignments");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch assignments:", err);
    throw err.response?.data || { message: "Server error" };
  }
};

export default api;
