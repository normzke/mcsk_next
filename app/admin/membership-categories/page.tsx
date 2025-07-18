import { Metadata } from "next"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Membership Categories - Admin Dashboard",
  description: "Manage membership categories",
}

async function getData() {
  // TODO: Implement API call
  // Fetch data from your API here
  return {
    data: [
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
    ],
  }
}

export default async function MembershipCategoriesPage() {
  const { data } = await getData()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Membership Categories</h2>
          <p className="text-muted-foreground">
            Manage membership categories and their features
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/admin/membership-categories/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Category
            </Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={data.map(item => ({
        id: item.id,
        title: item.title,
        features: item.features,
        order: item.order,
        isActive: item.is_active,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
      }))} />
    </div>
  )
} 