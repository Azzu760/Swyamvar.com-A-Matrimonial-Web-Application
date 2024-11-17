/*
  Warnings:

  - You are about to drop the column `connectedAt` on the `Connection` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Connection` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Connection` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Connection_requesterId_receiverId_idx";

-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "connectedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;
