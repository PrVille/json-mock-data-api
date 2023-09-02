-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "apiUserId" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "apiUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_apiUserId_fkey" FOREIGN KEY ("apiUserId") REFERENCES "ApiUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_apiUserId_fkey" FOREIGN KEY ("apiUserId") REFERENCES "ApiUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
