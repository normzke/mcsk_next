const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    console.log('Checking database connection...');
    await prisma.$connect();
    console.log('Database connection successful!');

    console.log('\nListing all announcements:');
    const announcements = await prisma.announcement.findMany({
      select: {
        id: true,
        title: true,
        isActive: true,
        isPublished: true,
        createdAt: true,
        deletedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    console.log(`\nFound ${announcements.length} announcements:`);
    console.table(announcements);

    console.log('\nChecking home API endpoint data...');
    const homeData = await prisma.announcement.findMany({
      where: {
        deletedAt: null,
        isPublished: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
    
    console.log(`\nFound ${homeData.length} published announcements for home page:`);
    console.table(homeData.map(a => ({
      id: a.id,
      title: a.title,
      isActive: a.isActive,
      isPublished: a.isPublished,
      createdAt: a.createdAt,
    })));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => console.log('\nScript completed successfully!'))
  .catch(console.error);
