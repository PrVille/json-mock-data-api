/*
  Warnings:

  - Added the required column `token` to the `ApiUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApiUser" ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "tokenLastUsedAt" TIMESTAMP(3);
