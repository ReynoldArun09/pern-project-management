import { Router } from "express";
import passport from "passport";
import { parsedEnvVariables } from "../config/appConfig";
import { googleLoginCallBack } from "../controllers/authController";

export const authRoutes = Router();
const failedUrl = `${parsedEnvVariables.GOOGLE_FRONTEND_URL}?status=failure`;

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: failedUrl,
  }),
  googleLoginCallBack,
);
