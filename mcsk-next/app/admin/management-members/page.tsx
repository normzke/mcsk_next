import { Metadata } from "next"
import { columns } from "./_components/columns"
import { DataTable } from "@/components/admin/DataTable"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ManagementMember } from "./columns"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Management Members | MCSK Admin",
  description: "Manage MCSK management members",
}

async function getManagementMemberStats() {
  // TODO: Implement API call
  return {
    total: 0,
    active: 0,
    inactive: 0,
  }
}

async function getManagementMembers(): Promise<ManagementMember[]> {
  // TODO: Implement API call
  return []
}

export default async function ManagementMembersPage() {
  let managementMembers = []
  try {
    managementMembers = await prisma.managementMember.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
      take: 100,
    })
  } catch (error) {
    console.error("Error fetching management members:", error)
    managementMembers = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Management Members</h2>
        <Link href="/admin/management-members/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Management Member
          </Button>
        </Link>
      </div>

      <DataTable data={managementMembers} columns={columns} searchKey="name" />
    </div>
  )
} 