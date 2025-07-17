'use client'

import { useState } from "react"
import Image from "next/image"
import PageHeader from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

type GalleryItem = {
  id: string
  title: string
  date: string
  location: string
  description: string
  images: string[]
  category: string
  tags: string[]
}

type GalleryData = {
  hero: {
    title: string
    description: string
    image: string
  }
  categories: string[]
  tags: string[]
  items: GalleryItem[]
  social_media: {
    title: string
    description: string
    links: Array<{
      platform: string
      url: string
    }>
  }
}

export default function GalleryContent({ initialData }: { initialData: GalleryData | null }) {
  // Add fallback data for faster loading
  const fallbackData: GalleryData = {
    hero: {
      title: "MCSK Gallery",
      description: "Browse photos and videos from our events, performances, and activities.",
      image: "/images/gallery/hero.jpg"
    },
    categories: ["Events", "Performances", "Workshops"],
    tags: ["Music", "Artists", "Copyright"],
    items: [],
    social_media: {
      title: "Follow Us",
      description: "Stay connected with MCSK on social media for the latest updates and photos.",
      links: [
        { platform: "Instagram", url: "https://instagram.com/mcsk" },
        { platform: "Facebook", url: "https://facebook.com/mcsk" },
        { platform: "Twitter", url: "https://twitter.com/mcsk" }
      ]
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!initialData) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Error Loading Gallery
            </h1>
            <p className="text-slate-600">
              Sorry, we couldn't load the gallery content. Please try again later.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const filteredItems = initialData.items.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true
    const matchesTag = selectedTag ? item.tags.includes(selectedTag) : true
    return matchesCategory && matchesTag
  })

  return (
    <main className="min-h-screen">
      <PageHeader
        title={initialData?.hero?.title || fallbackData.hero.title}
        description={initialData?.hero?.description || fallbackData.hero.description}
        image={initialData?.hero?.image || fallbackData.hero.image}
      />

      {/* Category Filter */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {initialData.categories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All Tags
            </Button>
            {initialData.tags.map((tag, index) => (
              <Button
                key={index}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-64 cursor-pointer group"
                  onClick={() => setSelectedImage(item.images[0])}
                >
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium">View Gallery</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge>{item.category}</Badge>
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <div className="space-y-2 text-slate-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-600">{item.description}</p>
                  <Dialog>
                    <DialogTrigger className="text-blue-600 hover:text-blue-700 font-medium mt-4 block">
                      View All Photos ({item.images.length}) →
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{item.title}</DialogTitle>
                        <DialogDescription>
                          <div className="mt-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {item.images.map((img, index) => (
                                <div
                                  key={index}
                                  className="relative h-48 cursor-pointer"
                                  onClick={() => setSelectedImage(img)}
                                >
                                  <Image
                                    src={img}
                                    alt={`${item.title} - Photo ${index + 1}`}
                                    fill
                                    className="object-cover rounded-lg"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image Viewer Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl">
          <div className="relative h-[70vh]">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Gallery Image"
                fill
                className="object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{initialData.social_media.title}</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            {initialData.social_media.description}
          </p>
          <div className="flex justify-center gap-4">
            {initialData.social_media.links.map((link, index) => (
              <Button
                key={index}
                variant="secondary"
                size="lg"
                onClick={() => window.open(link.url, '_blank')}
              >
                Follow on {link.platform}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 