import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ProfileForm } from './_components/profile-form'

export const metadata: Metadata = {
  title: 'Profile | MCSK Admin',
  description: 'Manage your admin profile',
}

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/login/admin')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) {
    redirect('/login/admin')
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <ProfileForm initialData={user} />
        </div>
      </div>
    </div>
  )
} 