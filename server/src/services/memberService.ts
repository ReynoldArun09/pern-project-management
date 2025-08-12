import { prisma } from "../lib/prisma";
import {
  BadRequestException,
  NotFoundException,
  UnAuthorizedException,
} from "../utils";

export const joinWorkspaceByInviteService = async (
  userId: string,
  inviteCode: string,
) => {
  const existingWorkspace = await prisma.workspace.findFirst({
    where: {
      inviteCode,
    },
  });

  if (!existingWorkspace) {
    throw new NotFoundException("Workspace doesnt exist.");
  }

  const existingMember = await prisma.member.findFirst({
    where: {
      userId,
      workspaceId: existingWorkspace.id,
    },
  });

  if (existingMember) {
    throw new BadRequestException("You are already member.");
  }

  const existingRole = await prisma.role.findUnique({
    where: {
      name: "MEMBER",
    },
  });

  if (!existingRole) {
    throw new NotFoundException("Role not found");
  }

  await prisma.member.create({
    data: {
      userId,
      workspaceId: existingWorkspace.id,
      roleId: existingRole.id,
    },
  });

  return { workspaceId: existingWorkspace.id, role: existingRole.name };
};

export const getMemberRoleInWorkspace = async (
  userId: string,
  workspaceId: string,
) => {
  const existingWorkspace = await prisma.workspace.findUnique({
    where: {
      id: workspaceId,
    },
  });

  if (!existingWorkspace) {
    throw new NotFoundException("Workspace not found.");
  }

  const existingMember = await prisma.member.findFirst({
    where: {
      userId,
      workspaceId,
    },
    include: {
      Role: true,
    },
  });

  if (!existingMember) {
    throw new UnAuthorizedException("You are not member of this workspace");
  }

  const roleName = existingMember.Role?.name;

  return { role: roleName };
};
