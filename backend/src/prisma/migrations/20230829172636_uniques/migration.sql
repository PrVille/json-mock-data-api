/*
  Warnings:

  - A unique constraint covering the columns `[username,apiKeyId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,apiKeyId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_username_apiKeyId_key" ON "User"("username", "apiKeyId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_apiKeyId_key" ON "User"("email", "apiKeyId");
