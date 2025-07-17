import { Metadata } from "next"
import { LicenseTypeForm } from "../_components/license-type-form"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Edit License Type - MCSK Admin",
  description: "Edit an existing license type",
}

async function getLicenseType(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/license-types/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch license type')
    }

    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export default async function EditLicenseTypePage({
  params,
}: {
  params: { id: string }
}) {
  const licenseType = await getLicenseType(params.id)

  if (!licenseType) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Edit License Type</h2>
        <p className="text-muted-foreground">
          Update the details of an existing license type
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-6 bg-card border rounded-lg">
          <LicenseTypeForm initialData={licenseType} />
        </div>
      </div>
    </div>
  )
} 