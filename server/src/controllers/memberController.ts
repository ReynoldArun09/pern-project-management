import { Request, Response } from "express";
import { asyncHandler, BadRequestException, sendApiResponse } from "../utils";
import { joinWorkspaceByInviteService } from "../services/memberService";
import { z } from "zod";

export const joinWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const inviteCode = z.string().parse(req.params.inviteCode);

    const userId = req.user?.id;

    if (!userId) {
      throw new BadRequestException("Invalid user Id");
    }

    const { workspaceId, role } = await joinWorkspaceByInviteService(
      userId,
      inviteCode,
    );

    sendApiResponse({
      res,
      data: {
        workspaceId,
        role,
      },
    });
  },
);
