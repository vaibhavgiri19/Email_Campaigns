import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/api/auth/login`, {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return true;
};

export const signup = async (email, password) => {
  await axios.post(`${API_URL}/api/auth/signup`, {
    email,
    password,
  });
  return true;
};
