import { Metadata } from "next"
import { MemberForm } from "../_components/member-form"

export const metadata: Metadata = {
  title: "New Member - MCSK Admin",
  description: "Add a new MCSK member",
}

export default function NewMemberPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">New Member</h2>
          <p className="text-muted-foreground">
            Add a new member to MCSK
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <MemberForm />
      </div>
    </>
  )
} 