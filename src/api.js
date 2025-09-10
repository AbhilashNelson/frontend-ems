// src/api.js
// Centralized Axios client and helper functions for the backend.
// Trainees: explain baseURL (environment variables), headers, and why a shared instance helps.

import axios from "axios";

// Read base URL from Vite environment variable (set in .env as VITE_API_BASE_URL)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Create Axios instance with sane defaults.
export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000, // 15 seconds timeout
});

// Attach token automatically if available
//adds an Axios request interceptor that automatically attaches a JWT 
// token (if available in localStorage) to the Authorization header 
// of every outgoing HTTP request. This is commonly used for authenticated API requests.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Standard JWT auth header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// CRUD helpers for employees (adjust endpoint names if your backend differs)
export const fetchEmployees = async () => {
  const res = await api.get("/employees");
  return res.data;
};

export const fetchEmployeeById = async (id) => {
  const res = await api.get(`/employees/${id}`);
  return res.data;
};

export const createEmployee = async (payload) => {
  const res = await api.post("/employees", payload);
  return res.data;
};

export const updateEmployee = async (id, payload) => {
  const res = await api.put(`/employees/${id}`, payload);
  return res.data;
};

export const deleteEmployee = async (id) => {
  const res = await api.delete(`/employees/${id}`);
  return res.data;
};

// src/api.js
//.........
//.........
// ===================== Departments =====================
export const fetchDepartments = async () => {
  // GET /departments
  const res = await api.get("/departments");
  return res.data;
};

// ===================== Auth =====================

// Register a new user
// Payload: { username, password, group_name }
export const signupUser = async (payload) => {
  const res = await api.post("/auth/signup", payload);
  return res.data;
};

// Login with username + password
// Backend expects form-encoded data: { username, password }
export const loginUser = async (payload) => {
  const form = new URLSearchParams();
  form.append("username", payload.username);
  form.append("password", payload.password);

  const res = await api.post("/auth/token", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  // Save token for future requests
  localStorage.setItem("token", res.data.access_token);

  return res.data;
};

// Logout: clear token
export const logoutUser = () => {
  localStorage.removeItem("token");
};