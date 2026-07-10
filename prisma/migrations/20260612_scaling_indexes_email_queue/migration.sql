-- Indexes for the hot query paths (dashboard, admin panel, marketplace)
CREATE INDEX IF NOT EXISTS "WorkerApplication_userId_idx" ON "WorkerApplication"("userId");
CREATE INDEX IF NOT EXISTS "WorkerApplication_status_idx" ON "WorkerApplication"("status");
CREATE INDEX IF NOT EXISTS "AccountListing_ownerId_idx" ON "AccountListing"("ownerId");
CREATE INDEX IF NOT EXISTS "AccountListing_status_idx" ON "AccountListing"("status");
CREATE INDEX IF NOT EXISTS "Match_workerId_idx" ON "Match"("workerId");
CREATE INDEX IF NOT EXISTS "Match_listingId_idx" ON "Match"("listingId");
CREATE INDEX IF NOT EXISTS "Notification_userId_createdAt_idx" ON "Notification"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "BlogPost_published_createdAt_idx" ON "BlogPost"("published", "createdAt");

-- A worker may only have one match per listing. Remove any duplicates that
-- slipped through the old check-then-insert race before adding the constraint
-- (keeps the oldest match per pair).
DELETE FROM "Match" a
USING "Match" b
WHERE a."listingId" = b."listingId"
  AND a."workerId" = b."workerId"
  AND a."createdAt" > b."createdAt";

CREATE UNIQUE INDEX IF NOT EXISTS "Match_listingId_workerId_key" ON "Match"("listingId", "workerId");

-- Outbound email queue (background sending + cron retry)
CREATE TABLE IF NOT EXISTS "QueuedEmail" (
    "id" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "QueuedEmail_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "QueuedEmail_status_createdAt_idx" ON "QueuedEmail"("status", "createdAt");
