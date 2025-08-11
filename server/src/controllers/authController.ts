import { Request, Response } from "express";
import { parsedEnvVariables } from "../config/appConfig";

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
