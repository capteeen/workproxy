import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  rl.question('Enter the email of the user to fully DELETE: ', async (email) => {
    console.log(`Deleting user ${email} and all related data...`);
    
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        console.log("User not found.");
      } else {
        // Delete related records first
        await prisma.workerApplication.deleteMany({ where: { userId: user.id } });
        await prisma.accountListing.deleteMany({ where: { ownerId: user.id } });
        await (prisma as any).emailVerification.deleteMany({ where: { identifier: email } });
        
        await prisma.user.delete({ where: { email } });
        console.log(`Success! User ${email} and all their records have been deleted.`);
      }
    } catch (e) {
      console.error("Error deleting user:", e);
    }
    rl.close();
    process.exit(0);
  });
}

main();
