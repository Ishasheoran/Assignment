import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // replace with backend URL if deployed
});

// Profiles
export const getProfiles = () => API.get("/profile");
export const createProfile = (data) => API.post("/profile", data);
export const updateProfile = (id, data) => API.put(`/profile/${id}`, data);
export const deleteProfile = (id) => API.delete(`/profile/${id}`);

// Queries
export const getProjectsBySkill = (skill) => API.get(`/profile/projects?skill=${skill}`);
export const getTopSkills = () => API.get("/profile/skills/top");

// Health Check
export const checkHealth = () => API.get("/health");
