-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_currentWorkspaceId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "currentWorkspaceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_currentWorkspaceId_fkey" FOREIGN KEY ("currentWorkspaceId") REFERENCES "public"."Workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
