import { Metadata } from "next"
import { getSession } from "@/lib/custom-auth"
import { redirect } from "next/navigation"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { SlideForm } from "../_components/slide-form"

export const metadata: Metadata = {
  title: "Add Slide | MCSK Admin",
  description: "Add a new hero slide",
}

export default async function NewSlidePage() {
  const session = await getSession()

  if (!session || session.user.role !== "admin") {
    redirect("/admin-login")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading
          title="Add Slide"
          description="Add a new hero slide"
        />
      </div>
      <Separator />
      <SlideForm />
    </div>
  )
} 