import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ManagementForm } from "../../_components/management-form"
import { prisma } from "@/lib/prisma"
import type { ManagementMember } from '@/types'

export const metadata: Metadata = {
  title: "Edit Management Member - MCSK Admin",
  description: "Edit board member or management staff details",
}

async function getManagementMember(id: string): Promise<ManagementMember | null> {
  try {
    const member = await prisma.managementMember.findUnique({
      where: { id },
    })
    
    if (!member) return null;
    
    // Cast to the correct types
    return {
      ...member,
      role: member.role as 'board_member' | 'executive' | 'director' | 'manager',
      department: member.department as 'board' | 'finance' | 'licensing' | 'distribution' | 'legal' | 'operations' | 'it' | 'hr',
      status: member.status as 'active' | 'inactive' | 'on_leave'
    } as ManagementMember;
  } catch (error) {
    console.error("Error fetching management member:", error)
    return null
  }
}

export default async function EditManagementPage({
  params,
}: {
  params: { id: string }
}) {
  const member = await getManagementMember(params.id)

  if (!member) {
    notFound()
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Management Member</h2>
          <p className="text-muted-foreground">
            Update board member or management staff details
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <ManagementForm member={member} />
      </div>
    </>
  )
} 