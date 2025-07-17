import { Metadata } from "next"
import { columns } from "./columns"
import { ManagementDataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ManagementMember } from "./columns"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Management - MCSK Admin",
  description: "Manage MCSK board members and management staff",
}

async function getManagementStats() {
  try {
    const total = await prisma.managementMember.count({
      where: {
        deletedAt: null,
      },
    })
    const active = await prisma.managementMember.count({
      where: {
        deletedAt: null,
        status: 'active'
      },
    })
    const inactive = await prisma.managementMember.count({
      where: {
        deletedAt: null,
        status: 'inactive'
      },
    })

    const membersByDepartment = await prisma.managementMember.groupBy({
      by: ['department'],
      _count: {
        id: true
      },
      where: {
        deletedAt: null,
        department: { not: null }
      }
    })

    const byDepartment: { [key: string]: number } = {}
    membersByDepartment.forEach(item => {
      if (item.department) {
        byDepartment[item.department] = item._count.id
      }
    })

    return {
      total,
      active,
      inactive,
      byDepartment,
    }
  } catch (error) {
    console.error("Error fetching management stats:", error)
    return {
      total: 0,
      active: 0,
      inactive: 0,
      byDepartment: {},
    }
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
    })
    return members as ManagementMember[] // Cast to the defined type
  } catch (error) {
    console.error("Error fetching management members:", error)
    return []
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(stats.byDepartment).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Department Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Department Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(stats.byDepartment).map(([department, count]) => (
              <div key={department} className="flex flex-col space-y-1">
                <p className="text-sm font-medium capitalize">{department}</p>
                <p className="text-2xl font-bold">{count}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <div className="rounded-md border bg-white">
        <ManagementDataTable 
          data={members} 
          columns={columns} 
          searchKey="firstName"
          searchPlaceholder="Search by name..."
          filters={[
            {
              key: 'role',
              label: 'Role',
              options: [
                { label: 'Board Member', value: 'board_member' },
                { label: 'Executive', value: 'executive' },
                { label: 'Director', value: 'director' },
                { label: 'Manager', value: 'manager' },
              ],
            },
            {
              key: 'department',
              label: 'Department',
              options: [
                { label: 'Board', value: 'board' },
                { label: 'Finance', value: 'finance' },
                { label: 'Licensing', value: 'licensing' },
                { label: 'Distribution', value: 'distribution' },
                { label: 'Legal', value: 'legal' },
                { label: 'Operations', value: 'operations' },
                { label: 'IT', value: 'it' },
                { label: 'HR', value: 'hr' },
              ],
            },
            {
              key: 'status',
              label: 'Status',
              options: [
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ],
            },
          ]}
        />
      </div>
    </div>
  )
} 