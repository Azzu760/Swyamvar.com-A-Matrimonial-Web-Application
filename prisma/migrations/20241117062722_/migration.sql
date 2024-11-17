/*
  Warnings:

  - The `status` column on the `Connection` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "status",
ADD COLUMN     "status" "ConnectionStatus" NOT NULL DEFAULT 'pending';
