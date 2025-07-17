import { Metadata } from "next"
import { JobForm } from "../_components/job-form"

export const metadata: Metadata = {
  title: "New Job | MCSK Admin",
  description: "Create a new job posting",
}

export default function NewJobPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">New Job</h2>
        <p className="text-muted-foreground">
          Create a new job posting
        </p>
      </div>

      <div className="rounded-md border bg-white p-6">
        <JobForm />
      </div>
    </div>
  )
} 