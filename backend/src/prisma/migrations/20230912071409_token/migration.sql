/*
  Warnings:

  - You are about to drop the column `tokenLastUsedAt` on the `ApiUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApiUser" DROP COLUMN "tokenLastUsedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
