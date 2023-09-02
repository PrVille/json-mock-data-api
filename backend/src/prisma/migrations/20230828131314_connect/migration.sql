/*
  Warnings:

  - You are about to drop the column `apiUserId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `apiUserId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `apiUserId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_apiUserId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_apiUserId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_apiUserId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "apiUserId",
ADD COLUMN     "apiKeyId" TEXT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "apiUserId",
ADD COLUMN     "apiKeyId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "apiUserId",
ADD COLUMN     "apiKeyId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "ApiKey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "ApiKey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "ApiKey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
