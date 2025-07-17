import { Metadata } from "next"
import { LicenseTypeForm } from "../_components/license-type-form"

export const metadata: Metadata = {
  title: "Add License Type - MCSK Admin",
  description: "Create a new license type",
}

export default function CreateLicenseTypePage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create License Type</h2>
          <p className="text-muted-foreground">
            Add a new license type
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <LicenseTypeForm />
      </div>
    </>
  )
} 