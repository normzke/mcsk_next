import { Metadata } from "next"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { columns } from "./_components/columns"
import prisma from "@/lib/prisma"
import type { HeroSlide } from '@/types'

export const metadata: Metadata = {
  title: "Hero Slides | MCSK Admin",
  description: "Manage hero slides",
}

export default async function HeroSlidesPage() {
  const session = await auth()

  if (!session || session.user.role !== "admin") {
    redirect("/auth/login")
  }

    let slides: HeroSlide[] = []
  try {
    slides = await prisma.heroSlide.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        order: "asc",
      },
    })
  } catch (error) {
    console.error("Error fetching hero slides:", error)
    slides = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading
          title="Hero Slides"
          description="Manage hero slides for the homepage"
        />
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={slides}
        searchKey="title"
        newRowLink="/admin/hero-slides/new"
      />
    </div>
  )
} 