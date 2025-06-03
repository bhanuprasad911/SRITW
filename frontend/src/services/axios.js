import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;


const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },withCredentials:true
});
export default axiosInstance;
