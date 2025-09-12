import { Metadata } from "next"
import { getSession } from "@/lib/custom-auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react"

export const metadata: Metadata = {
  title: "Notifications | MCSK Admin",
  description: "View and manage system notifications",
}

export default async function NotificationsPage() {
  const session = await getSession()

  if (!session || session.user.role !== "admin") {
    redirect("/admin-login")
  }

  // Mock notifications data - in a real app, this would come from the database
  const notifications = [
    {
      id: "1",
      type: "success",
      title: "New member registered",
      message: "John Doe has successfully registered as a new member.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "License renewal reminder",
      message: "5 licenses are due for renewal in the next 7 days.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
    },
    {
      id: "3",
      type: "info",
      title: "System maintenance",
      message: "Scheduled maintenance completed successfully.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
    },
    {
      id: "4",
      type: "error",
      title: "Payment processing issue",
      message: "Failed to process payment for license ID #12345.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: false,
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "success":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Success</Badge>
      case "warning":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case "error":
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Error</Badge>
      default:
        return <Badge variant="secondary">Info</Badge>
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days} day${days > 1 ? 's' : ''} ago`
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Manage and view system notifications
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No notifications</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                        {getNotificationBadge(notification.type)}
                        {!notification.read && (
                          <Badge variant="default" className="bg-blue-500">New</Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">
                        {notification.message}
                      </CardDescription>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(notification.timestamp)}
                  </span>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 