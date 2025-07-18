import { Metadata } from "next"
import { columns } from "./columns"
import { MembersDataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { prisma } from "@/lib/prisma"
import type { Member } from '@/types'

export const metadata: Metadata = {
  title: "Members - MCSK Admin",
  description: "Manage MCSK members",
}

async function getMembers() {
  try {
    const members = await prisma.member.findMany({
      where: {
        deletedAt: null
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        country: true,
        idNumber: true,
        dateOfBirth: true,
        bio: true,
        bankName: true,
        bankAccount: true,
        mpesaNumber: true,
        membershipType: true,
        status: true,
        profileImage: true,
        documents: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        licenses: true,
      }
    })
    // Transform the data to match the unified Member type
    return members.map((member: any) => ({
      id: member.id,
      name: member.name || '',
      email: member.email || '',
      phone: member.phone || '',
      address: member.address || '',
      idNumber: member.idNumber || '',
      dateOfBirth: member.dateOfBirth ? member.dateOfBirth.toISOString() : '',
      membershipType: member.membershipType || '',
      status: (member.status as 'active' | 'inactive' | 'suspended' | 'pending') || 'pending',
      joinDate: member.createdAt ? member.createdAt.toISOString() : '',
      profileImage: member.profileImage || '',
      bio: member.bio || '',
      bankName: member.bankName || '',
      bankAccount: member.bankAccount || '',
      mpesaNumber: member.mpesaNumber || '',
      createdAt: member.createdAt ? member.createdAt.toISOString() : '',
      updatedAt: member.updatedAt ? member.updatedAt.toISOString() : '',
      deletedAt: member.deletedAt ? member.deletedAt.toISOString() : null,
      category: {
        id: member.membershipType || '1',
        title: member.membershipType || 'Regular'
      },
      licenses: member.licenses || []
    }))
  } catch (error) {
    console.error('Error fetching members:', error)
    return []
  }
}

export default async function MembersPage() {
  const members = await getMembers()

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Members</h2>
          <p className="text-muted-foreground">
            Manage MCSK members and their details
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/admin/members/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <MembersDataTable data={members} columns={columns} />
      </div>
    </>
  )
} 