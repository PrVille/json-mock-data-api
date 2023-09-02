/*
  Warnings:

  - You are about to drop the column `hasApiKey` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `hasApiKey` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `hasApiKey` on the `User` table. All the data in the column will be lost.
  - Made the column `apiKeyId` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `apiKeyId` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `apiKeyId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "hasApiKey",
ALTER COLUMN "apiKeyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "hasApiKey",
ALTER COLUMN "apiKeyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasApiKey",
ALTER COLUMN "apiKeyId" SET NOT NULL;
