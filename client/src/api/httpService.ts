import axios from "axios";
// import useRefreshToken from "../hooks/useRefreshToken";

const httpService = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "x-makedle-header": "foobar",
    // Authorization header will be set in the request interceptor
  },
});

export const refreshHttpInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default httpService;
