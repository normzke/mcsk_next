import { Metadata } from "next"
import { notFound } from "next/navigation"
import { JobForm } from "../../_components/job-form"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Edit Job | MCSK Admin",
  description: "Edit an existing job posting",
}

interface EditJobPageProps {
  params: {
    id: string
  }
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  let job = await prisma.career.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!job) {
    notFound()
  }

  // Provide default values for new fields if missing (for local/dev build compatibility)
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
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit Job</h2>
        <p className="text-muted-foreground">
          Edit job posting details
        </p>
      </div>

      <div className="rounded-md border bg-white p-6">
        <JobForm initialData={jobWithDefaults} />
      </div>
    </div>
  )
} 