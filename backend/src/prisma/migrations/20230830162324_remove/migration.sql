/*
  Warnings:

  - A unique constraint covering the columns `[username,apiUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,apiUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_username_apiUserId_key" ON "User"("username", "apiUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_apiUserId_key" ON "User"("email", "apiUserId");
