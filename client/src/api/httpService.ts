import axios from "axios";

const TIMEOUT_DURATION = 10000; // 10 Seconds
const API_BASE_URL = "http://localhost:3000/api"; // TODO add production url

const defaultConfig = {
  baseURL: API_BASE_URL,
  timeout: TIMEOUT_DURATION,
  withCredentials: true,
};

const httpService = axios.create({ ...defaultConfig });

export const refreshHttpInstance = axios.create({ ...defaultConfig });

export default httpService;
