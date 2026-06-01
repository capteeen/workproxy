-- CreateTable: SignedDocument — stores filled + signed agent agreements and tasker contracts
CREATE TABLE IF NOT EXISTS "SignedDocument" (
    "id" TEXT NOT NULL,
    "docType" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "country" TEXT,
    "region" TEXT,
    "dob" TEXT,
    "address" TEXT,
    "payoutMethod" TEXT,
    "commissionRate" TEXT,
    "teamLead" TEXT,
    "signatureImage" TEXT NOT NULL,
    "signedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SignedDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SignedDocument_docType_idx" ON "SignedDocument"("docType");
CREATE INDEX IF NOT EXISTS "SignedDocument_email_idx" ON "SignedDocument"("email");
