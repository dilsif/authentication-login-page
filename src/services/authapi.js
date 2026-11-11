import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000"
});

// Register user
export const registerUser = (data) => {
  return API.post("/users", data);
};

// Login user
export const loginUser = async (email) => {
  const response = await API.get("/users", {
    params: { email }
  });

  return response.data;
};

// Get user profile
export const getUser = (id) => {
  return API.get(`/users/${id}`);
};

// Check username
export const checkUsername = async (username) => {
  const response = await API.get("/users", {
    params: { username }
  });

  return response.data.length > 0;
};