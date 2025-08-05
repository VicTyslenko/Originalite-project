import axios from "axios";

import { refreshToken } from "shared/utils";

const API_URI =
  process.env.NODE_ENV === "production" ? "https://originalite-server.onrender.com/api" : "http://localhost:4444/api";

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
  async config => {
    const { store } = require("../../store/index");
    const token = store.getState().auth.data?.accessToken;
    console.log("testing token", store.getState().auth);

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

      try {
        const newToken = await refreshToken();
        prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return privateInstance(prevRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },
);

export default privateInstance;
