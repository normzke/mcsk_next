import { Metadata } from "next"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import { ManagementMember } from "../columns"

export const metadata: Metadata = {
  title: "View Management Member - MCSK Admin",
  description: "View board member or management staff details",
}

async function getManagementMember(id: string): Promise<ManagementMember | null> {
  // TODO: Implement API call
  return null
}

export default async function ViewManagementPage({
  params,
}: {
  params: { id: string }
}) {
  const member = await getManagementMember(params.id)

  if (!member) {
    notFound()
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {member.firstName} {member.lastName}
          </h2>
          <p className="text-muted-foreground">
            {member.position}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/admin/management/${member.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Member
            </Button>
          </Link>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Member
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              {member.profileImage ? (
                <div className="relative h-20 w-20 rounded-full overflow-hidden">
                  <img
                    src={member.profileImage}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <span className="text-2xl text-muted-foreground">
                    {member.firstName[0]}
                    {member.lastName[0]}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-semibold">
                  {member.firstName} {member.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">{member.position}</p>
              </div>
            </div>

            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{member.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role Information */}
        <Card>
          <CardHeader>
            <CardTitle>Role Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium">Role</p>
                <Badge variant="outline" className="mt-1">
                  {member.role.split("_").map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(" ")}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Department</p>
                <Badge variant="secondary" className="mt-1">
                  {member.department.charAt(0).toUpperCase() + member.department.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant={member.status === "active" ? "default" : "secondary"} className="mt-1">
                  {member.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Biography */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Biography</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {member.bio}
            </p>
          </CardContent>
        </Card>

        {/* Term Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Term Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(member.startDate), "PPP")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">End Date</p>
                <p className="text-sm text-muted-foreground">
                  {member.endDate ? format(new Date(member.endDate), "PPP") : "Current"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Created At</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(member.createdAt), "PPP")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
} 