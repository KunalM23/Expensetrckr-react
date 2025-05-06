import axios from "axios";

const BASE_URL = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiGet = async (url) => {
  const response = await BASE_URL.get(url);
  return response.data;
};

export const apiPost = async (url, data) => {
  const response = await BASE_URL.post(url, data);
  return response.data;
};

export const apiPut = async (url, data) => {
  const response = await BASE_URL.put(url, data);
  return response.data;
};

export const apiDelete = async (url) => {
  const response = await BASE_URL.delete(url);
  return response.data;
};

