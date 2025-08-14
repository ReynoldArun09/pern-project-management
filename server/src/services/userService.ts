import { prisma } from '../lib/prisma';
import { BadRequestException } from '../utils';

export const getCurrentUserService = async (userId: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    throw new BadRequestException('User not found.');
  }

  return { user: existingUser };
};
