import { Metadata } from "next"
import { columns } from "./columns"
import { ManagementDataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { prisma } from "@/lib/prisma"
import type { ManagementMember } from '@/types'

export const metadata: Metadata = {
  title: "Management - MCSK Admin",
  description: "Manage MCSK board members and management staff",
}

// Add dynamic rendering to prevent static generation errors
export const dynamic = 'force-dynamic';

async function getManagementStats() {
  try {
    const total = await prisma.managementMember.count({
      where: { deletedAt: null },
    });
    const active = await prisma.managementMember.count({
      where: { deletedAt: null, isActive: true },
    });
    const inactive = await prisma.managementMember.count({
      where: { deletedAt: null, isActive: false },
    });

    return { total, active, inactive };
  } catch (error) {
    console.error("Error fetching management stats:", error);
    return { total: 0, active: 0, inactive: 0 };
  }
}

async function getManagementMembers(): Promise<ManagementMember[]> {
  try {
    const members = await prisma.managementMember.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
      take: 100,
    });
    
    // Cast to the correct types
    return members.map(member => ({
      ...member,
      role: member.role as 'board_member' | 'executive' | 'director' | 'manager',
      department: member.department as 'board' | 'finance' | 'licensing' | 'distribution' | 'legal' | 'operations' | 'it' | 'hr',
      status: member.status as 'active' | 'inactive' | 'on_leave'
    })) as ManagementMember[];
  } catch (error) {
    console.error("Error fetching management members:", error);
    return [];
  }
}

export default async function ManagementPage() {
  const [members, stats] = await Promise.all([
    getManagementMembers(),
    getManagementStats(),
  ])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Management</h2>
          <p className="text-muted-foreground">
            Manage MCSK board members and management staff
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/admin/management/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inactive}</div>
          </CardContent>
        </Card>
      </div>

      

      {/* Data Table */}
      <div className="rounded-md border bg-white">
        <ManagementDataTable 
          data={members} 
          columns={columns} 
          searchKey="name"
          searchPlaceholder="Search by name..."
          filters={[
            {
              key: 'isActive',
              label: 'Status',
              options: [
                { label: 'Active', value: 'true' },
                { label: 'Inactive', value: 'false' },
              ],
            },
          ]}
        />
      </div>
    </div>
  )
} 