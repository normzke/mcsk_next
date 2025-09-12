const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updatePartners() {
  try {
    // Update existing partners with new logos
    await prisma.partner.update({
      where: { id: 'a134b87e-0320-4850-824f-565165810ceb' },
      data: {
        logo: '/uploads/logos/wipo.svg',
        updatedAt: new Date()
      }
    });
    console.log('✅ Updated WIPO logo');

    await prisma.partner.update({
      where: { id: 'ca23e501-e23c-41a2-85d7-0ee5a8a8a875' },
      data: {
        logo: '/uploads/logos/kecobo.svg',
        updatedAt: new Date()
      }
    });
    console.log('✅ Updated KECOBO logo');

    // Add new partners
    const newPartners = [
      {
        id: `partner-${Date.now()}-1`,
        name: 'CISAC - International Confederation of Societies of Authors and Composers',
        logo: '/uploads/logos/cisac.svg',
        website: 'https://www.cisac.org',
        order: 2,
        isActive: true,
        updatedAt: new Date()
      },
      {
        id: `partner-${Date.now()}-2`,
        name: 'ARIPO - African Regional Intellectual Property Organization',
        logo: '/uploads/logos/aripo.svg',
        website: 'https://www.aripo.org',
        order: 3,
        isActive: true,
        updatedAt: new Date()
      },
      {
        id: `partner-${Date.now()}-3`,
        name: 'KAMP - Kenya Association of Music Producers',
        logo: '/uploads/logos/kamp.svg',
        website: 'https://www.kamp.or.ke',
        order: 4,
        isActive: true,
        updatedAt: new Date()
      },
      {
        id: `partner-${Date.now()}-4`,
        name: 'Ministry of Sports, Culture and Heritage',
        logo: '/uploads/logos/ministry.svg',
        website: 'https://www.sportsheritage.go.ke',
        order: 5,
        isActive: true,
        updatedAt: new Date()
      }
    ];

    for (const partner of newPartners) {
      await prisma.partner.create({
        data: partner
      });
      console.log(`✅ Added partner: ${partner.name}`);
    }

    console.log('✅ Partners updated successfully!');
  } catch (error) {
    console.error('❌ Error updating partners:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePartners(); 