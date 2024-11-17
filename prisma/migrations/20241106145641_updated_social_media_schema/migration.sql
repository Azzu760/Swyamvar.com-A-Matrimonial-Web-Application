/*
  Warnings:

  - You are about to drop the column `socialMediaLinks` on the `AdditionalDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdditionalDetails" DROP COLUMN "socialMediaLinks",
ADD COLUMN     "facebookLink" JSONB,
ADD COLUMN     "instagramLink" JSONB,
ADD COLUMN     "twitterLink" JSONB;
