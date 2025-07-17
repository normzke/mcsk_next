import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./_components/columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Careers | MCSK Admin",
  description: "Manage MCSK careers",
}

async function getCareersStats() {
  try {
    const [total, active, departments] = await Promise.all([
      prisma.career.count(),
      prisma.career.count({
        where: {
          deadline: {
            gt: new Date(),
          },
        },
      }),
      prisma.career.groupBy({
        by: ['location'],
        _count: true,
      }),
    ])

    return {
      total,
      active,
      departments: departments.reduce((acc: Record<string, number>, curr: { location: string | null; _count: number }) => ({
        ...acc,
        [curr.location ?? '']: curr._count,
      }), {}),
    }
  } catch (error) {
    console.error("Error fetching career stats:", error)
    return { // Return default/empty stats on error
      total: 0,
      active: 0,
      departments: {},
    }
  }
}

async function getJobs() {
  try {
    return prisma.career.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return [] // Return empty array on error
  }
}

export default async function CareersPage() {
  const [jobs, stats] = await Promise.all([
    getJobs(),
    getCareersStats(),
  ])

  const allowedTypes = ["full-time", "part-time", "contract"];
  const toStringArray = (arr: any) => Array.isArray(arr) ? arr.filter((v) => typeof v === 'string') : [];
  const jobsWithDefaults = jobs.map((job: any) => ({
    id: job.id,
    title: job.title,
    department: job.department ?? '',
    location: job.location ?? '',
    type: allowedTypes.includes((job.type ?? "") as string)
      ? (job.type as "full-time" | "part-time" | "contract")
      : "full-time",
    experience: job.experience ?? '',
    description: job.description,
    responsibilities: toStringArray(job.responsibilities),
    requirements: toStringArray(job.requirements),
    benefits: Array.isArray(job.benefits) ? job.benefits.filter((v: any) => typeof v === 'string') : [],
    deadline: job.deadline ?? new Date(),
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Careers</h2>
          <p className="text-muted-foreground">
            Manage job postings and career opportunities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/admin/careers/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(stats.departments).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Location Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Location Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(stats.departments).map(([location, count]) => (
              <div key={location} className="flex flex-col space-y-1">
                <p className="text-sm font-medium capitalize">{location}</p>
                <p className="text-2xl font-bold">{Number(count)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <div className="rounded-md border bg-white">
        <DataTable
          columns={columns}
          data={jobsWithDefaults}
          searchKey="title"
          searchPlaceholder="Search jobs..."
          filters={[
            {
              key: 'isActive',
              label: 'Status',
              options: [
                { label: 'Active', value: 'true' },
                { label: 'Inactive', value: 'false' },
              ],
            },
            {
              key: 'type',
              label: 'Type',
              options: [
                { label: 'Full Time', value: 'full-time' },
                { label: 'Part Time', value: 'part-time' },
                { label: 'Contract', value: 'contract' },
              ],
            },
            {
              key: 'location',
              label: 'Location',
              options: [
                { label: 'Nairobi', value: 'nairobi' },
                { label: 'Mombasa', value: 'mombasa' },
                { label: 'Kisumu', value: 'kisumu' },
                { label: 'Remote', value: 'remote' },
              ],
            },
          ]}
        />
      </div>
    </div>
  )
} 