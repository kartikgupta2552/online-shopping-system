// src/api/axiosInstance.js
import axios from "axios";
import { loaderControl } from "./loaderControl";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

axiosInstance.interceptors.request.use((config) => {
  loaderControl.show();
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    loaderControl.hide();
    return response;
  },
  (error) => {
    loaderControl.hide();
    return Promise.reject(error);
  }
);

export default axiosInstance;
