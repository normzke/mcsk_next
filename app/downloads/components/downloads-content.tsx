'use client'

import { useState } from "react"
import PageHeader from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FileText, Download, Eye, FileIcon, HelpCircle, MapPin } from "lucide-react"

type Document = {
  id: string
  title: string
  description: string
  fileType: string
  fileSize: string
  downloadUrl: string
  category: string
  tags: string[]
}

type Category = {
  id: string
  name: string
  description: string
  icon: string
  documents: Document[]
}

type DownloadsData = {
  hero: {
    title: string
    description: string
    image: string
  }
  categories: Category[]
  help: {
    title: string
    description: string
    sections: Array<{
      title: string
      description: string
      icon: string
      link: {
        text: string
        url: string
      }
    }>
  }
}

type ViewerState = {
  isOpen: boolean
  url: string
  title: string
}

export default function DownloadsContent({ initialData }: { initialData: DownloadsData | null }) {
  // Add fallback data for when initialData is undefined
  const fallbackData: DownloadsData = {
    hero: {
      title: "MCSK Downloads",
      description: "Access important documents and resources",
      image: "/images/hero/downloads-bg.jpg"
    },
    categories: [
      {
        id: "forms",
        name: "Forms",
        description: "Application forms and other important documents",
        icon: "file",
        documents: [
          {
            id: "membership-form",
            title: "Membership Application Form",
            description: "Form for applying for MCSK membership",
            fileType: "PDF",
            fileSize: "250KB",
            downloadUrl: "/documents/membership-form.pdf",
            category: "forms",
            tags: ["membership", "application"]
          }
        ]
      }
    ],
    help: {
      title: "Need Help?",
      description: "If you need assistance with downloads, please contact us",
      sections: [
        {
          title: "Contact Support",
          description: "Our team is ready to assist you",
          icon: "help",
          link: {
            text: "Contact Us",
            url: "/contact"
          }
        }
      ]
    }
  };

  // Use React hooks
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewer, setViewer] = useState<ViewerState>({
    isOpen: false,
    url: '',
    title: ''
  })

  if (!initialData) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Error Loading Downloads
            </h1>
            <p className="text-slate-600">
              Sorry, we couldn't load the downloads content. Please try again later.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const openViewer = (url: string, title: string) => {
    setViewer({ isOpen: true, url, title })
  }

  const closeViewer = () => {
    setViewer({ isOpen: false, url: '', title: '' })
  }

  // Filter documents based on search and category
  const filterDocuments = (documents: Document[] | undefined) => {
    if (!documents || !Array.isArray(documents)) return [];
    
    return documents.filter(doc => {
      const matchesSearch = searchQuery === '' || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.tags && Array.isArray(doc.tags) && doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      const matchesCategory = selectedCategory === null || doc.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        title={initialData?.hero?.title || fallbackData.hero.title}
        description={initialData?.hero?.description || fallbackData.hero.description}
        image={initialData?.hero?.image || fallbackData.hero.image}
      />

      {/* Search and Filters */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <Input
              type="search"
              placeholder="Search documents..."
              className="max-w-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </Button>
              {(initialData?.categories || fallbackData.categories).map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(initialData?.categories || fallbackData.categories).map((category) => {
              const filteredDocs = filterDocuments(category.documents)
              if (selectedCategory && category.name !== selectedCategory) return null
              if (filteredDocs.length === 0) return null

              return (
                <Card key={category.id} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <FileIcon className="h-8 w-8 text-blue-600 mr-4" />
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">
                          {category.name}
                        </h2>
                        <p className="text-slate-600">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      {filteredDocs.map((doc) => (
                        <AccordionItem key={doc.id} value={doc.id}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-red-500 mr-3" />
                              <span>{doc.title}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-8">
                              <p className="text-slate-600 mb-4">
                                {doc.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {doc.tags?.map((tag, index) => (
                                  <Badge key={index} variant="outline">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-slate-500">
                                  <span className="flex items-center">
                                    <FileIcon className="h-4 w-4 mr-1" />
                                    {doc.fileType}
                                  </span>
                                  <span>{doc.fileSize}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openViewer(doc.downloadUrl, doc.title)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => window.open(doc.downloadUrl, '_blank')}
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                {initialData?.help?.title || fallbackData.help.title}
              </h2>
              <p className="text-slate-600 text-center mb-8">
                {initialData?.help?.description || fallbackData.help.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(initialData?.help?.sections || fallbackData.help.sections).map((section, index) => (
                  <div key={index} className="text-center">
                    <div className="text-blue-600 mb-4">
                      {section.icon === 'help' ? (
                        <HelpCircle className="h-8 w-8 mx-auto" />
                      ) : (
                        <MapPin className="h-8 w-8 mx-auto" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {section.description}
                    </p>
                    <Button
                      variant="link"
                      onClick={() => window.location.href = section.link.url}
                    >
                      {section.link.text}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* PDF Viewer Dialog */}
      <Dialog open={viewer.isOpen} onOpenChange={closeViewer}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{viewer.title}</DialogTitle>
          </DialogHeader>
          {viewer.isOpen && (
            <div className="aspect-video">
              <iframe
                src={viewer.url}
                title={viewer.title}
                className="w-full h-full"
                frameBorder="0"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
} 