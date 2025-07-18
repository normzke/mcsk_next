import { Metadata } from 'next'
import { LicenseForm } from '../_components/license-form'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'New License | MCSK Admin',
  description: 'Create a new MCSK license',
}

export default async function NewLicensePage() {
  const [members, licenseTypes] = await Promise.all([
    prisma.member.findMany({
      where: {
        deletedAt: null,
        status: 'active',
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    }),
    prisma.licenseType.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        title: 'asc',
      },
    }),
  ])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New License</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <LicenseForm members={members} licenseTypes={licenseTypes} />
      </div>
    </div>
  )
} 