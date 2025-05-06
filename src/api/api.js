import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { apiGet, apiPost, apiPut, apiDelete } from "./apiHelper";

const ENDPOINTS = {
  EXPENSES: "/expenses",
  CATEGORY: "/category",
  USERS: "/users",
};

const generateToken = () => uuidv4();
const getUserId = () => localStorage.getItem("userId");

// --- AUTH ---
export const loginUser = async (loginData) => {
  try {
    const users = await apiGet(ENDPOINTS.USERS);
    const user = users.find((usr) => usr.email === loginData.email);

    if (!user) throw new Error("User not found");

    const isPasswordMatch = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordMatch) throw new Error("Invalid password");

    const accessToken = generateToken();
    const refreshToken = generateToken();

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", user.id);

    return { accessToken, refreshToken, userId: user.id };
  } catch (error) {
    console.error("Login error: ", error.message);
    throw new Error("Unable to log in. Please try again.");
  }
};

export const logoutUser = () => {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
  } catch (error) {
    console.error("Logout error: ", error.message);
    throw new Error("Error logging out. Please try again.");
  }
};

// --- EXPENSES ---
export const fetchAllExpenses = async () => {
  const userId = getUserId();
  return await apiGet(`${ENDPOINTS.EXPENSES}?userId=${userId}`);
};

export const addExpense = async (data) => {
  const userId = getUserId();
  return await apiPost(ENDPOINTS.EXPENSES, { ...data, userId });
};

export const updateExpense = (id, data) => apiPut(`${ENDPOINTS.EXPENSES}/${id}`, data);

export const deleteExpense = (id) => apiDelete(`${ENDPOINTS.EXPENSES}/${id}`);

// --- CATEGORY ---
export const fetchCategories = async () => {
  const userId = getUserId();
  return await apiGet(`${ENDPOINTS.CATEGORY}?userId=${userId}`);
};

export const addCategory = async (data) => {
  const userId = getUserId();
  return await apiPost(ENDPOINTS.CATEGORY, { ...data, userId });
};
