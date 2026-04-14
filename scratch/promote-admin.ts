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
  rl.question('Enter the email of the user to promote to ADMIN: ', async (email) => {
    console.log(`Promoting ${email} to ADMIN...`);
    try {
      const user = await prisma.user.update({
        where: { email },
        data: { role: 'admin' }
      });
      console.log(`Success! ${user.name} is now an ADMIN.`);
    } catch (e) {
      console.error("User not found or error occurred.");
    }
    rl.close();
    process.exit(0);
  });
}

main();
