import dotenv from "dotenv";
import { z } from "zod";
import { customLogger } from "../utils";
import { validationErrorMessages } from "../constants/validationErrorMessages";

dotenv.config();

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  SESSION_SECRET: z
    .string()
    .min(10, { message: validationErrorMessages.SESSION_SECRET }),
  CORS_ORIGIN: z
    .string()
    .min(1, { message: validationErrorMessages.CORS_ORIGIN }),
});

const googleSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CALLBACK_URL: z.string().min(1),
  GOOGLE_FRONTEND_URL: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

const envVariables = z.object({
  ...serverSchema.shape,
  ...googleSchema.shape,
});

type envVariablesType = z.infer<typeof envVariables>;

const parseEnv = (): envVariablesType => {
  try {
    return envVariables.parse(process.env);
  } catch (error) {
    customLogger.error(error);
    process.exit(1);
  }
};

export const parsedEnvVariables = parseEnv();
