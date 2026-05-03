-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT;
