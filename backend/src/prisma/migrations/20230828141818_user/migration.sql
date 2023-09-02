-- DropIndex
DROP INDEX "User_email_apiKeyId_key";

-- DropIndex
DROP INDEX "User_username_apiKeyId_key";

-- CreateIndex
CREATE INDEX "User_username_apiKeyId_idx" ON "User"("username", "apiKeyId");

-- CreateIndex
CREATE INDEX "User_email_apiKeyId_idx" ON "User"("email", "apiKeyId");
