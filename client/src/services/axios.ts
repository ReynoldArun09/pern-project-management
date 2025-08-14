import axios from "axios";
import { BASE_URL } from "./constants";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 1000,
});
