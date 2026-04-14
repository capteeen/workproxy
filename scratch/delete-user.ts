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
  const email = 'capteenhacked@gmail.com';
  console.log(`Deleting user ${email}...`);
  
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log("User not found.");
      process.exit(0);
    }

    // Delete related records first
    await prisma.workerApplication.deleteMany({ where: { userId: user.id } });
    await prisma.accountListing.deleteMany({ where: { ownerId: user.id } });
    await (prisma as any).emailVerification.deleteMany({ where: { identifier: email } });
    
    await prisma.user.delete({ where: { email } });
    
    console.log(`Success! User ${email} and all their records have been deleted.`);
  } catch (e) {
    console.error("Error deleting user:", e);
  }
  process.exit(0);
}

main();
