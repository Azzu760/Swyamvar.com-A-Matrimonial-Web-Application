-- AlterTable
ALTER TABLE "PhysicalAttributes" ALTER COLUMN "physicalDisability" DROP NOT NULL,
ALTER COLUMN "physicalDisability" SET DATA TYPE TEXT;
