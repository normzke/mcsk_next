import { PrismaClient } from '@prisma/client';
import { createPrismaClient } from './db-pool';

type PrismaClientSingleton = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// Use a single PrismaClient instance across the application
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Store the PrismaClient in the global object in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Handle database connection cleanup
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Handle process termination
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});
