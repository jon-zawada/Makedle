import axios from "axios";

const httpService = axios.create({
  baseURL: "https://makedle.onrender.com/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "x-makedle-header": "foobar",
    // Authorization header will be set in the request interceptor
  },
});

export const refreshHttpInstance = axios.create({
  baseURL: "https://makedle.onrender.com/api",
  withCredentials: true,
});

export default httpService;
