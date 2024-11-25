-- AlterEnum
ALTER TYPE "ConnectionStatus" ADD VALUE 'connect';

-- AlterTable
ALTER TABLE "Connection" ALTER COLUMN "status" SET DEFAULT 'connect';
