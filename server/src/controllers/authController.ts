import { NextFunction, Request, Response } from 'express';
import { parsedEnvVariables } from '../config/appConfig';
import passport from 'passport';

import { registerUserService } from '../services/authService';
import {
  asyncHandler,
  InternalServerException,
  sendApiResponse,
  UnAuthorizedException,
} from '../utils';
import { httpStatusCode } from '../enums/httpStatusCode';
import { apiSuccessMessages } from '../constants/apiResponseMessage';
import { registerSchema } from '../validations';

export const googleLoginCallBack = asyncHandler(
  async (req: Request, res: Response) => {
    const currentWorkspace = req.user?.workspaceId;

    if (!currentWorkspace) {
      return res.redirect(
        `${parsedEnvVariables.GOOGLE_FRONTEND_URL}?status=failure`,
      );
    }

    return res.redirect(
      `${parsedEnvVariables.GOOGLE_FRONTEND_URL}/workspace/${currentWorkspace}`,
    );
  },
);

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      'local',
      (
        err: Error | null,
        user: Express.User | false,
        info: { message: string } | undefined,
      ) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          throw new UnAuthorizedException('Invalid credentinals');
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

          sendApiResponse({
            res,
            data: user,
            message: apiSuccessMessages.LOGIN_SUCCESS,
          });
        });
      },
    )(req, res, next);
  },
);

export const logoutController = asyncHandler(
  async (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        throw new InternalServerException();
      }
    });

    sendApiResponse({
      res,
      message: apiSuccessMessages.LOGOUT_SUCCESS,
    });
  },
);

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({
      ...req.body,
    });

    await registerUserService(body);

    sendApiResponse({
      res,
      statusCode: httpStatusCode.CREATED,
      message: apiSuccessMessages.REGISTER_SUCCESS,
    });
  },
);
