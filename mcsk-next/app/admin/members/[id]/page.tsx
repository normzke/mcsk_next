import { Metadata } from "next"
import { MemberForm } from "../_components/member-form"

export const metadata: Metadata = {
  title: "Edit Member - MCSK Admin",
  description: "Edit member details",
}

async function getMember(id: string) {
  // TODO: Implement API call
  return null
}

export default async function EditMemberPage({
  params,
}: {
  params: { id: string }
}) {
  const member = await getMember(params.id)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Member</h2>
          <p className="text-muted-foreground">
            Update member details and information
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <MemberForm member={member} />
      </div>
    </>
  )
} 