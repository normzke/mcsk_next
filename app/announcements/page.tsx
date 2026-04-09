import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Announcements | MCSK',
  description: 'All official announcements from the Music Copyright Society of Kenya.'
};

export default async function AnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    where: { deletedAt: null, isPublished: true },
    orderBy: { publishAt: 'desc' },
    take: 30
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#1a1464]">All Announcements</h1>
      {announcements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {announcements.map(a => {
            const dateObj = new Date(a.publishAt || a.createdAt);
            const formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            return (
              <article key={a.id} className="bg-[#f5f7fa] rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow" aria-label={`Announcement: ${a.title}`}> 
                <div>
                  <h2 className="font-bold text-xl mb-2 text-[#1a1464]">{a.title}</h2>
                  <p className="text-gray-700 mb-4 whitespace-pre-line">{a.content}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-500">{formattedDate}</span>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">No announcements at this time.</div>
      )}
      <div className="flex justify-center mt-8">
        <Link href="/" className="text-[#1a1464] font-semibold hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
}