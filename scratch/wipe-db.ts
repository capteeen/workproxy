import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Wiping database...');
  
  // Order matters due to foreign keys if not cascading
  await prisma.workerApplication.deleteMany({});
  console.log('Cleared WorkerApplications');
  
  await prisma.accountListing.deleteMany({});
  console.log('Cleared AccountListings');
  
  await prisma.emailVerification.deleteMany({});
  console.log('Cleared EmailVerifications');
  
  await prisma.user.deleteMany({});
  console.log('Cleared Users');
  
  console.log('Database wiped successfully!');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
