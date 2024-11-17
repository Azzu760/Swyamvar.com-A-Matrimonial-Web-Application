/*
  Warnings:

  - The `physicalDisability` column on the `PhysicalAttributes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PhysicalAttributes" DROP COLUMN "physicalDisability",
ADD COLUMN     "physicalDisability" TEXT[];
