import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { parsedEnvVariables } from "./appConfig";
import { Request } from "express";
import {
  loginOrCreateAccountService,
  verifyUserService,
} from "../services/authService";
import { NotFoundException } from "../utils/customError";

passport.use(
  new GoogleStrategy(
    {
      clientID: parsedEnvVariables.GOOGLE_CLIENT_ID,
      clientSecret: parsedEnvVariables.GOOGLE_CLIENT_SECRET,
      callbackURL: parsedEnvVariables.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async (req: Request, accessToken, refreshToken, profile, done) => {
      try {
        const { email, sub: googleId, picture } = profile._json;
        if (!googleId) {
          throw new NotFoundException("Google Id is missing.");
        }
        const { user } = await loginOrCreateAccountService({
          provider: "GOOGLE",
          providerId: googleId,
          displayName: profile.displayName,
          picture,
          email,
        });
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true,
    },
    async (email, password, done) => {
      try {
        const user = await verifyUserService({ email, password });
        done(null, user);
      } catch (error: any) {
        done(error, false, { message: error?.message });
      }
    },
  ),
);

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));
