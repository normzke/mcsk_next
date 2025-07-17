import { Metadata } from "next"
import { HeroSlideForm } from "../_components/hero-slide-form"
import { api } from "@/lib/api"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Edit Hero Slide - MCSK Admin",
  description: "Edit hero slide details",
}

async function getHeroSlide(id: string) {
  try {
    const response = await api.heroSlides.get(id)
    return response.data
  } catch (error) {
    return null
  }
}

export default async function EditHeroSlidePage({
  params,
}: {
  params: { id: string }
}) {
  const slide = await getHeroSlide(params.id)

  if (!slide) {
    notFound()
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Hero Slide</h2>
          <p className="text-muted-foreground">
            Update hero slide details and content
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <HeroSlideForm
          initialData={slide}
          onSubmit={async (data) => {
            'use server'
            try {
              await api.heroSlides.update(params.id, data)
              return { success: true }
            } catch (error) {
              return { error: 'Failed to update hero slide' }
            }
          }}
        />
      </div>
    </>
  )
} 