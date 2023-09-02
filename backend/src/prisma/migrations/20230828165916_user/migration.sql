/*
  Warnings:

  - Made the column `apiKeyId` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `apiKeyId` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "apiKeyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "apiKeyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasApiKey" BOOLEAN NOT NULL DEFAULT false;
