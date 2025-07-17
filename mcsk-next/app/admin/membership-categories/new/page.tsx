import { Metadata } from "next"
import { MembershipCategoryForm } from "../_components/membership-category-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "New Membership Category - Admin Dashboard",
  description: "Create a new membership category",
}

export default function NewMembershipCategoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">New Membership Category</h2>
          <p className="text-muted-foreground">
            Create a new membership category
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/admin/membership-categories">
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-6">
        <MembershipCategoryForm />
      </div>
    </div>
  )
} 