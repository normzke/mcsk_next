import { Metadata } from "next"
import { MemberForm } from "../_components/member-form"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "New Member - MCSK Admin",
  description: "Add a new MCSK member",
}

export default async function NewMemberPage() {
  // Fetch membership categories and map to ensure they match the MembershipCategory interface
  const categoriesData = await prisma.membershipCategory.findMany()
  
  // Map the Prisma result to match the MembershipCategory interface
  const categories = categoriesData.map(category => ({
    id: category.id,
    title: category.title,
    // Cast JSON features to string array
    features: Array.isArray(category.features) 
      ? category.features.map(f => String(f)) 
      : typeof category.features === 'object' && category.features !== null
        ? Object.values(category.features).map(f => String(f))
        : [],
    order: category.order || null,
    isActive: category.isActive,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt
  }))

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">New Member</h2>
          <p className="text-muted-foreground">
            Add a new member to MCSK
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <MemberForm categories={categories} />
      </div>
    </>
  )
}