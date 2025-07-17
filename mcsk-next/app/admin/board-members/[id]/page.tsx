import { Metadata } from "next"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import { BoardMember } from "../columns"

export const metadata: Metadata = {
  title: "View Board Member - MCSK Admin",
  description: "View board member details",
}

async function getBoardMember(id: string): Promise<BoardMember | null> {
  // TODO: Implement API call
  return null
}

export default async function ViewBoardMemberPage({
  params,
}: {
  params: { id: string }
}) {
  const member = await getBoardMember(params.id)

  if (!member) {
    notFound()
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{member.name}</h2>
          <p className="text-muted-foreground">
            {member.position}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/admin/board-members/${member.id}/edit`}>
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
              {member.photo ? (
                <div className="relative h-20 w-20 rounded-full overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <span className="text-2xl text-muted-foreground">
                    {member.name.charAt(0)}
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
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  {member.email || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">
                  {member.phone || "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Board Information */}
        <Card>
          <CardHeader>
            <CardTitle>Board Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium">Position</p>
                <Badge variant="outline" className="mt-1">
                  {member.position}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Display Order</p>
                <Badge variant="secondary" className="mt-1">
                  {member.order}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant={member.is_active ? "default" : "secondary"} className="mt-1">
                  {member.is_active ? "Active" : "Inactive"}
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

        {/* Social Links */}
        {(member.linkedin_url || member.twitter_url) && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {member.linkedin_url && (
                  <div>
                    <p className="text-sm font-medium">LinkedIn</p>
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {member.linkedin_url}
                    </a>
                  </div>
                )}
                {member.twitter_url && (
                  <div>
                    <p className="text-sm font-medium">Twitter</p>
                    <a
                      href={member.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {member.twitter_url}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
} 