import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieSession from "cookie-session";
import { parsedEnvVariables } from "./config/appConfig";
import { authRoutes } from "./routes/authRoutes";
import passport from "passport";

import "./config/passport";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: [parsedEnvVariables.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    secure: parsedEnvVariables.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRoutes);

export default app;
