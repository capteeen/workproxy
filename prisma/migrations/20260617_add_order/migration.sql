-- CreateTable: Order — service bookings taken by the Open Claw Telegram bot
CREATE TABLE IF NOT EXISTS "Order" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Order_reference_key" ON "Order"("reference");
CREATE INDEX IF NOT EXISTS "Order_reference_idx" ON "Order"("reference");
CREATE INDEX IF NOT EXISTS "Order_status_idx" ON "Order"("status");
