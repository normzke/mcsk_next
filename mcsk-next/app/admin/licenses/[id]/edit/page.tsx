import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LicenseForm } from '../../_components/license-form'
import prisma from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Edit License | MCSK Admin',
  description: 'Edit MCSK license details',
}

interface EditLicensePageProps {
  params: {
    licenseId: string
  }
}

export default async function EditLicensePage({ params }: EditLicensePageProps) {
  const [license, members, licenseTypes] = await Promise.all([
    prisma.license.findUnique({
      where: {
        id: params.licenseId,
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        licenseType: {
          select: {
            id: true,
            title: true,
            category: true,
          },
        },
      },
    }),
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

  if (!license) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit License</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <LicenseForm
          initialData={license}
          members={members}
          licenseTypes={licenseTypes}
        />
      </div>
    </div>
  )
} 