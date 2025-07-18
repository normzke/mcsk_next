import { Prisma } from '@prisma/client';

console.log('Available model names in Prisma client:');
// Prisma.ModelName does not exist in Prisma v6+. Remove or replace this line.

// Also check the actual type of the exported model names
const prisma = new (require('@prisma/client').PrismaClient)();
console.log('\nAvailable models on PrismaClient instance:');
console.log(Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$')));
