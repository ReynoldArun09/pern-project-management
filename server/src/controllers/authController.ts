import { NextFunction, Request, Response } from "express";
import { parsedEnvVariables } from "../config/appConfig";
import passport from "passport";
import { registerSchema } from "../validations/authSchema";
import { registerUserService } from "../services/authService";

export const googleLoginCallBack = async (req: Request, res: Response) => {
  const currentWorkspace = req.ctx.workspaceId;

  if (!currentWorkspace) {
    return res.redirect(
      `${parsedEnvVariables.GOOGLE_FRONTEND_URL}?status=failure`,
    );
  }

  return res.redirect(
    `${parsedEnvVariables.GOOGLE_FRONTEND_URL}/workspace/${currentWorkspace}`,
  );
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    "local",
    (
      err: Error | null,
      user: Express.User | false,
      info: { message: string } | undefined,
    ) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({
          message: "invalid email",
        });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        return res.status(200).json({
          message: "logged in",
          user,
        });
      });
    },
  )(req, res, next);
};

export const logoutController = async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "internal error" });
    }
  });

  req.session = null;
  return res.status(200).json({ message: "logged out" });
};

export const registerUserController = async (req: Request, res: Response) => {
  const body = registerSchema.parse({
    ...req.body,
  });

  await registerUserService(body);

  return res.status(201).json({
    message: "user created",
  });
};
