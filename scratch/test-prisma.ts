import { prisma } from '../src/lib/prisma';

async function test() {
  console.log("Checking prisma models...");
  console.log("Available models:", Object.keys(prisma).filter(k => !k.startsWith('_')));
  
  try {
    const matchCount = await (prisma as any).match.count();
    console.log("Match model is available! Count:", matchCount);
  } catch (e: any) {
    console.error("Match model is MISSING or failed:", e.message);
  }
  process.exit(0);
}

test();
