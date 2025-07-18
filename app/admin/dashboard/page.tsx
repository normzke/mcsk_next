
import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Overview } from '@/components/admin/dashboard/overview'
import { RecentActivity } from '@/components/admin/dashboard/recent-activity'
import { Users, Music, Award, Calendar, Download, FileText, MessageSquare } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Dashboard - MCSK Admin',
  description: 'Admin dashboard for the Music Copyright Society of Kenya',
}

async function getStats() {
  try {
    const [members, licenses, events, downloads, news, messages, waves] = await Promise.all([
      prisma.user.count({ where: { role: 'member', deletedAt: null } }),
      prisma.license.count({ where: { deletedAt: null } }),
      prisma.event.count({ where: { deletedAt: null } }),
      prisma.download.count({ where: { deletedAt: null } }),
      prisma.news.count({ where: { deletedAt: null } }),
      prisma.contactMessage.count({ where: { deletedAt: null } }),
      prisma.wave.count({ where: { deletedAt: null } })
    ])

    return {
      members,
      licenses,
      events,
      downloads,
      news,
      messages,
      waves
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    // Fallback to default values if database query fails
    return {
      members: 0,
      licenses: 0,
      events: 0,
      downloads: 0,
      news: 0,
      messages: 0,
      waves: 0
    }
  }
}

export default async function DashboardPage() {
  const stats = await getStats()
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to the MCSK Admin Dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Members
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.members}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/members" className="text-primary hover:underline">
                View all members
              </Link>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Licenses
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.licenses}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/licenses" className="text-primary hover:underline">
                Manage licenses
              </Link>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.events}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/events" className="text-primary hover:underline">
                View calendar
              </Link>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Wave Entries
            </CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.waves}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/waves" className="text-primary hover:underline">
                Manage wave system
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/admin/members/new">
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-4 hover:bg-gray-50 transition-colors">
                  <Users className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Add Member</span>
                </div>
              </Link>
              <Link href="/admin/news/new">
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-4 hover:bg-gray-50 transition-colors">
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Create News</span>
                </div>
              </Link>
              <Link href="/admin/events/new">
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-4 hover:bg-gray-50 transition-colors">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Add Event</span>
                </div>
              </Link>
              <Link href="/admin/downloads/new">
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-4 hover:bg-gray-50 transition-colors">
                  <Download className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Upload File</span>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}