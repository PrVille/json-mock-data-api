-- AlterTable
ALTER TABLE "User" ADD COLUMN     "apiUserId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_apiUserId_fkey" FOREIGN KEY ("apiUserId") REFERENCES "ApiUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
