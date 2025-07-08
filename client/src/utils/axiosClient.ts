import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";

let baseURL = process.env.REACT_APP_SERVER_URL;

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

// REQUEST INTERCEPTORS
axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

// RESPONSE INTERCEPTORS
axiosClient.interceptors.response.use(
  async (response: AxiosResponse) => {
    const data = response.data;

    if (data.status === "ok") {
      return response;
    }

    const originalRequest = response.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    const statusCode = data.statusCode;
    const error = data.result;

    if (statusCode !== 401) {
      alert(error);
    }

    //means the access token expired
    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const response = await axios
        .create({
          withCredentials: true,
        })
        .get(`${baseURL}jwtAuth/refresh`);

      if (response.data.status === "ok") {
        const newAccessToken = response.data.result.accessToken;

        setItem(KEY_ACCESS_TOKEN, newAccessToken);
        originalRequest.headers![
          "Authorization"
        ] = `Bearer ${response.data.result.accessToken}`;

        return axios(originalRequest);
      } else {
        alert("Token Expired");
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace(`/signin`);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
  async (error) => {
    alert(error.message);
    return Promise.reject(error);
  }
);
