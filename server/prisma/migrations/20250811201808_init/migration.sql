/*
  Warnings:

  - The values [READ,WRITE,DELETE,UPDATE] on the enum `PermissionTypeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PermissionTypeEnum_new" AS ENUM ('CREATE_WORKSPACE', 'DELETE_WORKSPACE', 'EDIT_WORKSPACE', 'MANAGE_WORKSPACE_SETTINGS', 'ADD_MEMBER', 'CHANGE_MEMBER_ROLE', 'REMOVE_MEMBER', 'CREATE_PROJECT', 'EDIT_PROJECT', 'DELETE_PROJECT', 'CREATE_TASK', 'EDIT_TASK', 'DELETE_TASK', 'VIEW_ONLY');
ALTER TABLE "public"."Permission" ALTER COLUMN "type" TYPE "public"."PermissionTypeEnum_new" USING ("type"::text::"public"."PermissionTypeEnum_new");
ALTER TYPE "public"."PermissionTypeEnum" RENAME TO "PermissionTypeEnum_old";
ALTER TYPE "public"."PermissionTypeEnum_new" RENAME TO "PermissionTypeEnum";
DROP TYPE "public"."PermissionTypeEnum_old";
COMMIT;
