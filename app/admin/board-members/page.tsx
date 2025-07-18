import { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { columns } from "./_components/columns"
import { DataTable } from "@/components/admin/DataTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BoardMember } from '@/types'
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Board Members | MCSK Admin",
  description: "Manage MCSK board members",
}

// Add dynamic rendering to prevent static generation errors
export const dynamic = 'force-dynamic';

async function getBoardMemberStats() {
  // TODO: Implement API call
  return {
    total: 0,
    active: 0,
    inactive: 0,
  }
}

async function getBoardMembers(): Promise<BoardMember[]> {
  // TODO: Implement API call
  return []
}

export default async function BoardMembersPage() {
  let boardMembers: BoardMember[] = []
  try {
    // Using type assertion to access the model
    const result = await prisma.managementMember.findMany({
      where: {
        role: 'board_member',
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
      take: 100,
    })
    if (result && Array.isArray(result)) {
      boardMembers = result.map((bm) => ({
        ...bm,
        createdAt: bm.createdAt ? new Date(bm.createdAt).toISOString() : '',
        updatedAt: bm.updatedAt ? new Date(bm.updatedAt).toISOString() : '',
        deletedAt: bm.deletedAt ? new Date(bm.deletedAt).toISOString() : null,
      }))
    }
  } catch (error) {
    console.error("Error fetching board members:", error)
    boardMembers = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Board Members</h2>
        <Link href="/admin/board-members/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Board Member
          </Button>
        </Link>
      </div>

      <DataTable data={boardMembers} columns={columns} searchKey="name" />
    </div>
  )
} 