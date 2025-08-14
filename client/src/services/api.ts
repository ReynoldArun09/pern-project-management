import axios from "./axios";
import { BASE_URL } from "./constants";
import type {
  signInSchemaType,
  signUpSchemaType,
} from "@/validations/auth.schema";

export const loginUserApi = async (data: signInSchemaType) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, data);
  return response.data;
};

export const registerUserApi = async (data: signUpSchemaType) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, data);
  return response.data;
};

export const getCurrentUserApi = async () => {
  const response = await axios.get(`${BASE_URL}/user/current-user`);
  return response.data;
};
