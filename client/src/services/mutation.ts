import { useMutation } from "@tanstack/react-query";
import { loginUserApi, registerUserApi } from "./api";

export function useLoginMutation() {
  return useMutation({
    mutationFn: loginUserApi,
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: registerUserApi,
  });
}
