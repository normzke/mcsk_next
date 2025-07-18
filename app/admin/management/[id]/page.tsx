import { Metadata } from "next"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import { prisma } from "@/lib/prisma"
import Image from "next/image"

export const metadata: Metadata = {
  title: "View Management Member - MCSK Admin",
  description: "View board member or management staff details",
}

async function getManagementMember(id: string): Promise<any | null> {
  try {
    const member = await prisma.managementMember.findUnique({
      where: { id },
    })
    if (!member) {
      return null
    }
    return {
      id: member.id,
      name: member.name,
      position: member.position,
      profileImage: member.profileImage,
      bio: member.bio,
      isActive: member.isActive,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
    }
  } catch (error) {
    console.error("Error fetching management member:", error)
    return null
  }
}

export default async function ViewManagementPage({ params }: { params: { id: string } }) {
  const member = await getManagementMember(params.id)

  if (!member) {
    notFound()
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{member.name}</h2>
          <p className="text-muted-foreground">{member.position}</p>
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
        {/* Member Information */}
        <Card>
          <CardHeader>
            <CardTitle>Member Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              {member.profileImage ? (
                <div className="relative h-20 w-20 rounded-full overflow-hidden">
                  <Image
                    src={member.profileImage}
                    alt={member.name}
                    className="object-cover"
                    fill
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <span className="text-2xl text-muted-foreground">
                    {member.name ? member.name[0] : ''}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.position}</p>
              </div>
            </div>

            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge
                  variant={member.isActive ? "success" : "destructive"}
                  className="mt-1"
                >
                  {member.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium">Created At</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(member.createdAt), "PPPpp")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(member.updatedAt), "PPPpp")}
                </p>
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
              {member.bio || "No biography provided."}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}