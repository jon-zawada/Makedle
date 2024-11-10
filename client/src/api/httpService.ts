import axios from "axios";

const httpService = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "x-makedle-header": "foobar",
    // Authorization: `Bearer ${localStorage.getItem('token')}`,  // Add JWT token - setting JWT not yet implemented
  },
});

export default httpService;
