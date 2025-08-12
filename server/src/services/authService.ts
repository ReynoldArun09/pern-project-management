import { prisma } from "../lib/prisma";
import { NotFoundException } from "../utils/customError";
import bcrypt from "bcrypt";
import { registerSchemaType } from "../validations/authSchema";

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

export const verifyUserService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const account = await prisma.account.findUnique({
    where: {
      provider: "EMAIL",
      providerId: email,
    },
  });

  if (!account) {
    throw new NotFoundException("Invalid Email");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: account.userId,
    },
  });

  if (!user) {
    throw new NotFoundException("User not found for the given account");
  }

  return user;
};

export const registerUserService = async ({
  email,
  name,
  password,
}: registerSchemaType) => {
  const startTransaction = await prisma.$transaction(async (tx: any) => {
    const existingUser = await tx.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      //throw error
    }

    const user = await tx.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    await tx.account.create({
      data: {
        userId: user.id,
        provider: "EMAIL",
        providerId: email,
      },
    });

    const workspace = await tx.workspace.create({
      data: {
        name: "My Workspace",
        description: `Workspace create for ${user.name}`,
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

    return {
      userId: user.id,
      workspaceId: workspace.id,
    };
  });

  return startTransaction;
};
