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

export const metadata: Metadata = {
  title: "View Job | MCSK Admin",
  description: "View job posting details",
}

interface ViewJobPageProps {
  params: {
    id: string
  }
}

export default async function ViewJobPage({ params }: ViewJobPageProps) {
  const job = await prisma.career.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!job) {
    notFound()
  }

  const allowedTypes = ["full-time", "part-time", "contract"];
  const toStringArray = (arr: any) => Array.isArray(arr) ? arr.filter((v) => typeof v === 'string') : [];
  const jobWithDefaults = {
    id: job!.id,
    title: job!.title,
    department: (job as any).department ?? '',
    location: job?.location ?? '',
    type: allowedTypes.includes((job?.type ?? "") as string)
      ? (job?.type as "full-time" | "part-time" | "contract")
      : "full-time",
    experience: (job as any).experience ?? '',
    description: job!.description,
    responsibilities: toStringArray(job?.responsibilities),
    requirements: toStringArray(job?.requirements),
    benefits: Array.isArray((job as any).benefits) ? (job as any).benefits.filter((v: any) => typeof v === 'string') : [],
    deadline: job?.deadline ?? new Date(),
    createdAt: job!.createdAt,
    updatedAt: job!.updatedAt,
  };

  const isExpired = jobWithDefaults.deadline ? new Date(jobWithDefaults.deadline) < new Date() : false;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{jobWithDefaults.title}</h2>
          <p className="text-muted-foreground">
            {jobWithDefaults.department}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/admin/careers/${jobWithDefaults.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Job
            </Button>
          </Link>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Job
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Job Information */}
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium">Department</p>
                <Badge variant="outline" className="mt-1">
                  {jobWithDefaults.department.split("_").map((word: string) => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(" ")}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Type</p>
                <Badge variant="outline" className="mt-1">
                  {jobWithDefaults.type.split("-").map((word: string) => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(" ")}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Location</p>
                <Badge variant="outline" className="mt-1">
                  {jobWithDefaults.location.charAt(0).toUpperCase() + jobWithDefaults.location.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Experience</p>
                <p className="text-sm text-muted-foreground">{jobWithDefaults.experience}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Application Deadline</p>
                <Badge variant={isExpired ? "destructive" : "default"} className="mt-1">
                  {format(new Date(jobWithDefaults.deadline), "PPP")}
                  {isExpired && " (Expired)"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {jobWithDefaults.description}
            </p>
          </CardContent>
        </Card>

        {/* Responsibilities */}
        <Card>
          <CardHeader>
            <CardTitle>Responsibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {jobWithDefaults.responsibilities.map((responsibility: string, index: number) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {responsibility}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {jobWithDefaults.requirements.map((requirement: string, index: number) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {requirement}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {jobWithDefaults.benefits.map((benefit: string, index: number) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {benefit}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 