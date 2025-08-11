/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currentWorkspaceId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_workspaceId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "workspaceId",
ADD COLUMN     "currentWorkspaceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Workspace" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_ownerId_key" ON "public"."Workspace"("ownerId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_currentWorkspaceId_fkey" FOREIGN KEY ("currentWorkspaceId") REFERENCES "public"."Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Workspace" ADD CONSTRAINT "Workspace_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
