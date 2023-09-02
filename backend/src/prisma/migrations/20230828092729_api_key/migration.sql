-- DropForeignKey
ALTER TABLE "ApiKey" DROP CONSTRAINT "ApiKey_apiUserId_fkey";

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_apiUserId_fkey" FOREIGN KEY ("apiUserId") REFERENCES "ApiUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
