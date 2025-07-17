import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ManagementForm } from "../../_components/management-form"
import { ManagementMember } from "../../columns"

export const metadata: Metadata = {
  title: "Edit Management Member - MCSK Admin",
  description: "Edit board member or management staff details",
}

async function getManagementMember(id: string): Promise<ManagementMember | null> {
  // TODO: Implement API call
  return null
}

export default async function EditManagementPage({
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
          <h2 className="text-2xl font-bold tracking-tight">Edit Management Member</h2>
          <p className="text-muted-foreground">
            Update board member or management staff details
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <ManagementForm member={member} />
      </div>
    </>
  )
} 