import { jwtDecode } from "jwt-decode";

export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token); // Decodes the token to get user information
  } catch (err) {
    return null;
  }
};

export const login = async (credentials) => {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error("Invalid login");

  const { accessToken } = await response.json();
  localStorage.setItem("token", accessToken);
};

export const signUp = async (credentials) => {
  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error("not able to register " + response);

  const { accessToken } = await response.json();
  localStorage.setItem("token", accessToken);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => localStorage.getItem("token");