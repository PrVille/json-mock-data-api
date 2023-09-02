/*
  Warnings:

  - You are about to drop the column `apiKeyId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `apiKeyId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `apiKeyId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ApiKey` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username,apiUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,apiUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiUserId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apiUserId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apiUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ApiKey" DROP CONSTRAINT "ApiKey_apiUserId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_apiKeyId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_apiKeyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_apiKeyId_fkey";

-- DropIndex
DROP INDEX "User_email_apiKeyId_key";

-- DropIndex
DROP INDEX "User_username_apiKeyId_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "apiKeyId",
ADD COLUMN     "apiUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "apiKeyId",
ADD COLUMN     "apiUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "apiKeyId",
ADD COLUMN     "apiUserId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ApiKey";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_apiUserId_key" ON "User"("username", "apiUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_apiUserId_key" ON "User"("email", "apiUserId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_apiUserId_fkey" FOREIGN KEY ("apiUserId") REFERENCES "ApiUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_apiUserId_fkey" FOREIGN KEY ("apiUserId") REFERENCES "ApiUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_apiUserId_fkey" FOREIGN KEY ("apiUserId") REFERENCES "ApiUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
