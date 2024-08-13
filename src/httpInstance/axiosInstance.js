import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  withCredentials: true,
  credentials: "include",
});
export default API;
