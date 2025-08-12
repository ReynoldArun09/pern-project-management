import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieSession from "express-session";
import passport from "passport";

import "./config/passport";
import { parsedEnvVariables } from "./config/appConfig";
import { authRoutes } from "./routes";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: parsedEnvVariables.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    secret: [parsedEnvVariables.SESSION_SECRET],
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: parsedEnvVariables.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRoutes);

export default app;
