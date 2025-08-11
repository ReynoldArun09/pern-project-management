import { prisma } from "../lib/prisma";
import { NotFoundException } from "../utils/customError";

type AccountDetails = {
  provider: "GOOGLE" | "EMAIL";
  providerId: string;
  email?: string;
  picture?: string;
  displayName: string;
};

export const loginOrCreateAccountService = async ({
  provider,
  providerId,
  email,
  picture,
  displayName,
}: AccountDetails) => {
  const startTransaction = await prisma.$transaction(async (tx: any) => {
    let user = await tx.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      user = await tx.user.create({
        data: {
          email,
          profilePicture: picture || null,
          name: displayName,
        },
      });

      await tx.account.create({
        data: {
          userId: user.id,
          provider: provider,
          providerId: providerId,
        },
      });

      const workspace = await tx.workspace.create({
        data: {
          name: "My workspace",
          description: `workspace created for ${user.name}`,
          ownerId: user.id,
        },
      });

      const ownerRole = await tx.role.findUnique({
        where: {
          name: "OWNER",
        },
      });

      if (!ownerRole) {
        throw new NotFoundException("Owner role not found");
      }

      await tx.member.create({
        data: {
          User: {
            connect: {
              id: user.id,
            },
          },
          Workspace: {
            connect: {
              id: workspace.id,
            },
          },
          Role: {
            connect: {
              id: ownerRole.id,
            },
          },
          joinedAt: new Date(),
        },
      });

      await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          currentWorkspaceId: workspace.id,
        },
      });

      return { user };
    }

    return { user };
  });

  return startTransaction;
};

const user = {
  name: "fake",
};

export const verifyUserService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return { user };
};
