import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_APP_API_BASE_URL ||
    "https://app.wewantwaste.co.uk/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
