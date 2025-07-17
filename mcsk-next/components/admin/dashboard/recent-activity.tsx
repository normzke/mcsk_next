'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Music, User, FileText, Download, Bell, AlertCircle } from "lucide-react"
import { format } from "date-fns"

type Activity = {
  id: string | number
  type: string
  action: string
  subject: string
  timestamp: Date
  icon: any
  color: string
}

const iconMap: Record<string, any> = {
  member: User,
  news: FileText,
  wave: Music,
  event: Calendar,
  download: Download,
  announcement: Bell,
}

const colorMap: Record<string, string> = {
  member: "bg-blue-100 text-blue-700",
  news: "bg-purple-100 text-purple-700",
  wave: "bg-green-100 text-green-700",
  event: "bg-yellow-100 text-yellow-700",
  download: "bg-indigo-100 text-indigo-700",
  announcement: "bg-red-100 text-red-700",
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch('/api/admin/dashboard/activity')
        
        if (!response.ok) {
          throw new Error('Failed to fetch activity data')
        }
        
        const result = await response.json()
        
        // Transform the data to include icon and color
        const formattedActivities = result.data.map((activity: any) => ({
          ...activity,
          timestamp: new Date(activity.timestamp),
          icon: iconMap[activity.type] || AlertCircle,
          color: colorMap[activity.type] || "bg-gray-100 text-gray-700"
        }))
        
        setActivities(formattedActivities)
      } catch (err) {
        console.error('Error fetching activities:', err)
        setError('Could not load recent activities')
        // Fallback to empty array if API fails
        setActivities([])
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchActivities()
  }, [])
  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = activity.icon
        
        return (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className={`${activity.color} p-2 rounded-full`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="text-sm">
                <span className="font-medium">
                  {activity.subject}
                </span>{' '}
                <Badge variant="outline" className="ml-2">
                  {activity.type}
                </Badge>
              </p>
              <p className="text-xs text-muted-foreground">
                {format(activity.timestamp, "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          </div>
        )
      })}
      <div className="mt-4 text-center">
        <a href="/admin/activity" className="text-xs text-primary hover:underline">
          View all activity
        </a>
      </div>
    </div>
  )
}
