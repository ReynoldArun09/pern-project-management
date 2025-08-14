import { Request, Response } from 'express';
import { asyncHandler, BadRequestException, sendApiResponse } from '../utils';
import { apiSuccessMessages } from '../constants/apiResponseMessage';
import { getCurrentUserService } from '../services/userService';

export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new BadRequestException('Invalid User ID.');
    }
    const { user } = await getCurrentUserService(userId);

    sendApiResponse({
      res,
      data: user,
      message: apiSuccessMessages.FETCHED_USER,
    });
  },
);
