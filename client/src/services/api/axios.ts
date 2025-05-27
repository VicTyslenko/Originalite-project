import axios from "axios";

import { refreshToken } from "shared/utils";

const API_URI =
  process.env.NODE_ENV === "production" ? "https://originalite-project.onrender.com/api" : "http://localhost:4444/api";

export const publicInstance = axios.create({
  baseURL: API_URI,
  withCredentials: true,
});

const privateInstance = axios.create({
  baseURL: API_URI,
  timeout: 3000,
  withCredentials: true,
});

privateInstance.interceptors.request.use(
  config => {
    const { store } = require("../../store/index");
    const token = store.getState().auth.data?.accessToken;

    if (token && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

privateInstance.interceptors.response.use(
  res => res,
  async error => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newToken = await refreshToken();

      prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
      return privateInstance(prevRequest);
    }
    return Promise.reject(error);
  },
);

const getAxiosInstance = () => {
  const keepSignedIn = localStorage.getItem("keepSignedIn");
  return keepSignedIn ? privateInstance : publicInstance;
};

export default getAxiosInstance();
