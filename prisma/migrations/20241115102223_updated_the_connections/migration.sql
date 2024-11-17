-- AlterTable
ALTER TABLE "AdditionalDetails" ALTER COLUMN "facebookLink" SET DATA TYPE TEXT,
ALTER COLUMN "instagramLink" SET DATA TYPE TEXT,
ALTER COLUMN "twitterLink" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "Connection_requesterId_receiverId_idx" ON "Connection"("requesterId", "receiverId");

-- CreateIndex
CREATE INDEX "UserStatus_userId_idx" ON "UserStatus"("userId");
