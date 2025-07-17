import { Metadata } from "next"
import { PartnerForm } from "../_components/partner-form"

export const metadata: Metadata = {
  title: "Edit Partner - MCSK Admin",
  description: "Edit partner details",
}

async function getPartner(id: string) {
  // TODO: Implement API call
  return null
}

export default async function EditPartnerPage({
  params,
}: {
  params: { id: string }
}) {
  const partner = await getPartner(params.id)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Partner</h2>
          <p className="text-muted-foreground">
            Update partner details and content
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <PartnerForm partner={partner} />
      </div>
    </>
  )
} 