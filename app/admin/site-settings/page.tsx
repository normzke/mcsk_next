import { Metadata } from "next"
import { getSession } from "@/lib/custom-auth"
import { redirect } from "next/navigation"
import { SiteSettingsForm } from "./_components/site-settings-form"

export const metadata: Metadata = {
  title: "Site Settings | MCSK Admin",
  description: "Manage site settings and branding",
}

export default async function SiteSettingsPage() {
  const session = await getSession()

  if (!session || session.user.role !== "admin") {
    redirect("/admin-login")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
          <p className="text-muted-foreground">
            Manage site branding, logos, and general settings
          </p>
        </div>
      </div>
      <SiteSettingsForm />
    </div>
  )
} 