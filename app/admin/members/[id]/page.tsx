import { Metadata } from "next"
import { notFound } from "next/navigation"
import { MemberForm } from "../_components/member-form"
import { prisma } from "@/lib/prisma"
import type { Member, MembershipCategory } from '@/types'

export const metadata: Metadata = {
  title: "Edit Member - MCSK Admin",
  description: "Edit member details",
}

async function getMembershipCategories(): Promise<MembershipCategory[]> {
  try {
    const categories = await prisma.membershipCategory.findMany();
    
    // Cast the features field to string[] to match the MembershipCategory type
    return categories.map(category => ({
      ...category,
      features: Array.isArray(category.features) ? category.features : []
    })) as MembershipCategory[];
  } catch (error) {
    console.error("Failed to fetch membership categories:", error)
    return []
  }
}

async function getMember(id: string): Promise<Member | null> {
  try {
    const member = await prisma.member.findUnique({
      where: { id },
      include: {
        membershipCategory: true
      }
    })
    
    if (!member) return null;
    
    // Cast to the correct types
    return {
      ...member,
      status: member.status as 'active' | 'inactive' | 'suspended' | 'pending',
      dateOfBirth: member.dateOfBirth,
      joinDate: member.joinDate,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      deletedAt: member.deletedAt,
      // Map membershipCategory to category for the Member interface
      category: member.membershipCategory ? {
        id: member.membershipCategory.id,
        title: member.membershipCategory.title
      } : undefined
    } as Member;
  } catch (error) {
    console.error("Failed to fetch member:", error)
    return null
  }
}

export default async function EditMemberPage({
  params,
}: {
  params: { id: string }
}) {
  const [member, categories] = await Promise.all([
    getMember(params.id),
    getMembershipCategories(),
  ])

  if (!member) {
    notFound()
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Member</h2>
          <p className="text-muted-foreground">
            Update member details and information
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <MemberForm initialData={member} categories={categories} />
      </div>
    </>
  )
}