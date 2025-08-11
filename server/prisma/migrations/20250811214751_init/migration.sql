-- DropForeignKey
ALTER TABLE "public"."Member" DROP CONSTRAINT "Member_roleId_fkey";

-- AlterTable
ALTER TABLE "public"."Member" ALTER COLUMN "roleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
