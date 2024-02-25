import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://motion.propulsion-home.ch/backend/api",
});
