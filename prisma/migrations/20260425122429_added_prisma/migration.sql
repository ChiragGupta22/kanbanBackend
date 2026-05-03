/*
  Warnings:

  - You are about to drop the column `teamId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Issue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_teamId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "teamId";

-- DropTable
DROP TABLE "Issue";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Team";

-- DropEnum
DROP TYPE "IssueStatus";

-- DropEnum
DROP TYPE "Priority";
