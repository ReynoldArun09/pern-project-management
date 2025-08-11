-- DropForeignKey
ALTER TABLE "public"."Member" DROP CONSTRAINT "Member_workspaceId_fkey";

-- AlterTable
ALTER TABLE "public"."Member" ALTER COLUMN "workspaceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."Workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
