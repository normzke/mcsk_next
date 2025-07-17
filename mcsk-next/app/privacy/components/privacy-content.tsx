'use client'

import PageHeader from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Lock, Shield, Eye, FileText, Bell } from "lucide-react"

type PrivacySection = {
  id: string
  title: string
  content: string
  subsections?: Array<{
    title: string
    content: string
    items?: string[]
  }>
}

type PrivacyData = {
  hero: {
    title: string
    description: string
    image: string
  }
  lastUpdated: string
  introduction: string
  sections: PrivacySection[]
  contact: {
    title: string
    content: string
    email: string
    phone: string
    address: string
  }
}

export default function PrivacyContent({ initialData }: { initialData: PrivacyData | null }) {
  if (!initialData) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Error Loading Privacy Policy
            </h1>
            <p className="text-slate-600">
              Sorry, we couldn't load the privacy policy content. Please try again later.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const getIconForSection = (sectionId: string) => {
    switch (sectionId) {
      case 'collection':
        return Eye
      case 'protection':
        return Shield
      case 'security':
        return Lock
      case 'rights':
        return FileText
      case 'notifications':
        return Bell
      default:
        return Lock
    }
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        title={initialData.hero.title}
        description={initialData.hero.description}
        image={initialData.hero.image}
      />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Lock className="h-8 w-8 text-blue-600 mr-4" />
                  <h2 className="text-2xl font-bold">Privacy Policy</h2>
                </div>
                <span className="text-sm text-slate-500">
                  Last updated: {initialData.lastUpdated}
                </span>
              </div>
              <p className="text-slate-600 whitespace-pre-wrap">
                {initialData.introduction}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {initialData.sections.map((section) => {
                const IconComponent = getIconForSection(section.id)
                return (
                  <Card key={section.id}>
                    <AccordionItem value={section.id} className="border-none">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center text-left">
                          <div className="mr-4">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-semibold">{section.title}</h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="prose prose-slate max-w-none">
                          <p className="text-slate-600 mb-6 whitespace-pre-wrap">
                            {section.content}
                          </p>
                          {section.subsections && (
                            <div className="space-y-6">
                              {section.subsections.map((subsection, index) => (
                                <div key={index}>
                                  <h4 className="font-semibold text-slate-900 mb-2">
                                    {subsection.title}
                                  </h4>
                                  <p className="text-slate-600 mb-4 whitespace-pre-wrap">
                                    {subsection.content}
                                  </p>
                                  {subsection.items && (
                                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                                      {subsection.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Card>
                )
              })}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-blue-600 mr-4" />
                <h2 className="text-2xl font-bold">{initialData.contact?.title}</h2>
              </div>
              <p className="text-slate-600 mb-8">
                {initialData.contact?.content}
              </p>
              <div className="space-y-4 text-slate-600">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <p>{initialData.contact?.address}</p>
                </div>
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-blue-600 mr-3" />
                  <p>{initialData.contact?.phone}</p>
                </div>
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-blue-600 mr-3" />
                  <a
                    href={`mailto:${initialData.contact?.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {initialData.contact?.email}
                  </a>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  className="w-full"
                  onClick={() => window.location.href = '/contact'}
                >
                  Contact Privacy Team
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
} 