/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ApiUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ApiUser_email_key" ON "ApiUser"("email");
