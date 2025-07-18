import { prisma } from './lib/prisma'

async function main() {
  // Try accessing the model using bracket notation
  try {
    // @ts-ignore - Intentionally ignoring type checking for debugging
    const result = await prisma['boardmember'].findFirst();
    console.log('Success with prisma["boardmember"]:', result);
  } catch (error) {
    console.error('Error with prisma["boardmember"]:', error);
  }

  try {
    // @ts-ignore - Intentionally ignoring type checking for debugging
    const result = await prisma['boardMember'].findFirst();
    console.log('Success with prisma["boardMember"]:', result);
  } catch (error) {
    console.error('Error with prisma["boardMember"]:', error);
  }
}

main()
  .then(() => console.log('Debug complete'))
  .catch(e => console.error('Debug error:', e))
  .finally(async () => {
    await prisma.$disconnect();
  });
