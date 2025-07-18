import { Metadata } from "next"
import { PartnerForm } from "../_components/partner-form"
import type { Partner } from '@/types'
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Edit Partner - MCSK Admin",
  description: "Edit partner details",
}

async function getPartner(id: string) {
  // TODO: Implement API call
  return null
}

export default async function EditPartnerPage({
  params,
}: {
  params: { id: string }
}) {
  const partner = await prisma.partner.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!partner) {
    notFound()
  }

  const mappedPartner: Partner = {
    id: partner.id,
    name: partner.name || '',
    logo: partner.logo || null,
    website: partner.website || '',
    order: typeof partner.order === 'number' ? partner.order : 0,
    createdAt: partner.createdAt.toISOString(),
    updatedAt: partner.updatedAt.toISOString(),
    deletedAt: partner.deletedAt?.toISOString() ?? null,
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Partner</h2>
          <p className="text-muted-foreground">
            Update partner details and content
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <PartnerForm initialData={mappedPartner} />
      </div>
    </>
  )
} 