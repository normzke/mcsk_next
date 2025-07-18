import { Metadata } from "next"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { columns } from "./columns"
import { LicenseTypesDataTable } from "./data-table"
import Link from "next/link"

// Force dynamic rendering to prevent build-time fetch errors
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "License Types - MCSK Admin",
  description: "Manage license types for music usage",
}

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/license-types`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch license types')
    }

    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export default async function LicenseTypesPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">License Types</h2>
          <p className="text-muted-foreground">
            Manage license types for different music usage scenarios
          </p>
        </div>
        <Link href="/admin/license-types/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add License Type
          </Button>
        </Link>
      </div>

      <LicenseTypesDataTable columns={columns} data={data} />
    </div>
  )
} 