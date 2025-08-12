import { Router } from "express";
import passport from "passport";
import { parsedEnvVariables } from "../config/appConfig";
import {
  googleLoginCallBack,
  loginController,
  logoutController,
  registerUserController,
} from "../controllers/authController";

export const authRoutes = Router();
const failedUrl = `${parsedEnvVariables.GOOGLE_FRONTEND_URL}?status=failure`;

authRoutes.post("/login", loginController);
authRoutes.post("/logout", logoutController);
authRoutes.post("/register", registerUserController);

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
