import { Metadata } from "next"
import { ServiceForm } from "../_components/service-form"

export const metadata: Metadata = {
  title: "Edit Service - MCSK Admin",
  description: "Edit service details",
}

async function getService(id: string) {
  // TODO: Implement API call
  return null
}

export default async function EditServicePage({
  params,
}: {
  params: { id: string }
}) {
  const service = await getService(params.id)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Service</h2>
          <p className="text-muted-foreground">
            Update service details and content
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <ServiceForm service={service} />
      </div>
    </>
  )
} 