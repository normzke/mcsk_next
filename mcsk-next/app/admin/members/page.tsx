import { Metadata } from "next"
import { columns } from "./columns"
import { MembersDataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { prisma } from "@/lib/prisma"

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
      include: {
        licenses: true
      }
    })
    
    // Transform the data to match the expected format in the columns
    return members.map(member => ({
      id: member.id,
      membership_number: member.id.substring(0, 8).toUpperCase(),
      first_name: member.name.split(' ')[0],
      last_name: member.name.split(' ').slice(1).join(' '),
      email: member.email,
      phone: member.phone || '',
      address: member.address || '',
      id_number: member.idNumber || '',
      date_of_birth: new Date().toISOString(), // Placeholder as it's not in the schema
      membership_category_id: member.membershipType || '',
      status: member.status as any,
      join_date: member.createdAt.toISOString(),
      profile_photo: member.profileImage,
      bio: null,
      bank_name: null,
      bank_account: null,
      mpesa_number: null,
      created_at: member.createdAt.toISOString(),
      updated_at: member.updatedAt.toISOString(),
      deleted_at: member.deletedAt ? member.deletedAt.toISOString() : null,
      category: {
        id: member.membershipType || '1',
        title: member.membershipType || 'Regular'
      }
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