import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
  pgPool: Pool | undefined;
};

function createPool() {
  return new Pool({
    connectionString: `${process.env.DATABASE_URL}`,
    // Serverless functions each hold their own pool, so keep it small to
    // avoid exhausting Postgres max_connections under concurrent load.
    max: parseInt(process.env.DATABASE_POOL_SIZE || '5', 10),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
}

const pool = globalForPrisma.pgPool ?? createPool();
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pgPool = pool;
}
