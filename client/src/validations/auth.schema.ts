import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().trim().min(1, {
    message: 'Email is required',
  }),
  password: z.string().trim().min(1, {
    message: 'Password is required',
  }),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Name is required',
  }),
  email: z.string().trim().min(1, {
    message: 'Email is required',
  }),
  password: z.string().trim().min(1, {
    message: 'Password is required',
  }),
});

export type signInSchemaType = z.infer<typeof signInSchema>;
export type signUpSchemaType = z.infer<typeof signUpSchema>;
