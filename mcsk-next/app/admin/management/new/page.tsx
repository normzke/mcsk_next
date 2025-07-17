import { Metadata } from "next"
import { ManagementForm } from "../_components/management-form"

export const metadata: Metadata = {
  title: "New Management Member - MCSK Admin",
  description: "Add a new board member or management staff",
}

export default function CreateManagementPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create Management Member</h2>
          <p className="text-muted-foreground">
            Add a new board member or management staff
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <ManagementForm />
      </div>
    </>
  )
} 