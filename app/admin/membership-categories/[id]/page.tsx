import { Metadata } from "next"
import { MembershipCategoryForm } from "../_components/membership-category-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Edit Membership Category - Admin Dashboard",
  description: "Edit membership category details",
}

async function getMembershipCategory(categoryId: string) {
  // TODO: Implement API call
  // Fetch data from your API here
  const categories = [
    {
      id: "1",
      title: "Composer/Author",
      features: [
        "Full voting rights",
        "Higher royalty share",
        "Work registration priority",
        "Access to all member benefits",
        "Eligible for board positions"
      ],
      order: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Publisher",
      features: [
        "Publishing rights management",
        "Catalog administration",
        "International collection",
        "Publishing tools access",
        "Business support services"
      ],
      order: 2,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Successor",
      features: [
        "Rights inheritance management",
        "Estate planning support",
        "Continued royalty collection",
        "Legacy protection",
        "Historical catalog access"
      ],
      order: 3,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  const category = categories.find(c => c.id === categoryId)
  if (!category) notFound()
  return category
}

interface EditMembershipCategoryPageProps {
  params: {
    categoryId: string
  }
}

export default async function EditMembershipCategoryPage({
  params,
}: EditMembershipCategoryPageProps) {
  const category = await getMembershipCategory(params.categoryId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Membership Category</h2>
          <p className="text-muted-foreground">
            Edit membership category details
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
        <MembershipCategoryForm initialData={{
          id: category.id,
          title: category.title,
          features: category.features,
          order: category.order,
          isActive: category.is_active,
          createdAt: new Date(category.created_at),
          updatedAt: new Date(category.updated_at),
        }} />
      </div>
    </div>
  )
} 