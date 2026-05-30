-- AlterTable: add phone field to User
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "phone" TEXT;
