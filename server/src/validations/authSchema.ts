import { z } from 'zod';

export const emailSchema = z.string().trim().min(1).max(255);
export const passwordSchema = z.string().trim().min(4);

export const registerSchema = z.object({
  name: z.string().min(4),
  email: emailSchema,
  password: passwordSchema,
});

export type registerSchemaType = z.infer<typeof registerSchema>;
