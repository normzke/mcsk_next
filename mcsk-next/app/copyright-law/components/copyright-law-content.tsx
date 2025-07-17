'use client'

import PageHeader from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Scale, Shield, FileText, Download, ExternalLink } from "lucide-react"

type LegalSection = {
  id: string
  title: string
  content: string
  subsections?: Array<{
    title: string
    content: string
    items?: string[]
  }>
}

type Resource = {
  id: string
  title: string
  description: string
  type: string
  url: string
  fileSize?: string
}

type CopyrightLawData = {
  hero: {
    title: string
    description: string
    image: string
  }
  overview: {
    title: string
    description: string
    keyPoints: string[]
  }
  sections: LegalSection[]
  rights: Array<{
    title: string
    description: string
    icon: string
  }>
  resources: {
    title: string
    description: string
    categories: Array<{
      name: string
      items: Resource[]
    }>
  }
  faqs: Array<{
    question: string
    answer: string
  }>
}

export default function CopyrightLawContent({ initialData }: { initialData: CopyrightLawData | null }) {
  if (!initialData) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Error Loading Copyright Law Content
            </h1>
            <p className="text-slate-600">
              Sorry, we couldn't load the copyright law content. Please try again later.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        title={initialData.hero.title}
        description={initialData.hero.description}
        image={initialData.hero.image}
      />

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">{initialData.overview.title}</h2>
              <p className="text-slate-600 mb-8">{initialData.overview.description}</p>
              <div className="space-y-4">
                {(initialData.overview.keyPoints || []).map((point, index) => (
                  <div key={index} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="ml-4 text-slate-600">{point}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Legal Sections */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {initialData.sections.map((section) => (
                <Card key={section.id}>
                  <AccordionItem value={section.id} className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center text-left">
                        <div className="mr-4">
                          <Scale className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold">{section.title}</h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 mb-6">{section.content}</p>
                        {section.subsections && (
                          <div className="space-y-6">
                            {section.subsections.map((subsection, index) => (
                              <div key={index}>
                                <h4 className="font-semibold text-slate-900 mb-2">
                                  {subsection.title}
                                </h4>
                                <p className="text-slate-600 mb-4">{subsection.content}</p>
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
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Rights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Your Rights as a Creator</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {(initialData.rights || []).map((right, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col items-center text-center">
                    {right.icon === 'shield' && <Shield className="h-12 w-12 text-blue-600 mb-4" />}
                    {right.icon === 'scale' && <Scale className="h-12 w-12 text-blue-600 mb-4" />}
                    {right.icon === 'file' && <FileText className="h-12 w-12 text-blue-600 mb-4" />}
                    <h3 className="text-xl font-bold mb-2">{right.title}</h3>
                    <p className="text-slate-600">{right.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{initialData.resources.title}</h2>
              <p className="text-slate-600">{initialData.resources.description}</p>
            </div>
            {initialData.resources.categories && initialData.resources.categories.length > 0 && (
              <Tabs defaultValue={initialData.resources.categories[0].name} className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
                  {initialData.resources.categories.map((category) => (
                    <TabsTrigger key={category.name} value={category.name}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {(initialData.resources.categories || []).map((category) => (
                  <TabsContent key={category.name} value={category.name}>
                    <div className="grid md:grid-cols-2 gap-6">
                      {(category.items || []).map((resource) => (
                        <Card key={resource.id} className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              {resource.type === 'pdf' && <FileText className="h-8 w-8 text-red-600" />}
                              {resource.type === 'link' && <ExternalLink className="h-8 w-8 text-blue-600" />}
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                              <p className="text-slate-600 mb-4">{resource.description}</p>
                              {resource.type === 'pdf' ? (
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-slate-500">{resource.fileSize}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(resource.url, '_blank')}
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(resource.url, '_blank')}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Visit Resource
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            {initialData.faqs && initialData.faqs.length > 0 && (
              <Accordion type="single" collapsible className="w-full">
                {(initialData.faqs || []).map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-slate-600">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </section>
    </main>
  )
} 