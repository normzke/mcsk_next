'use client'

import { useState } from "react"
import PageHeader from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Building,
  Music2,
  Radio,
  Tv,
  Bus,
  Hotel,
  Store,
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Download,
} from "lucide-react"

type LicenseType = {
  id: string
  title: string
  description: string
  category: string
  price: number
  duration: string
  requirements: string[]
  benefits: string[]
  applicationProcess: string[]
  documents: Array<{
    name: string
    url: string
  }>
}

type LicensingData = {
  hero: {
    title: string
    description: string
    image: string
  }
  benefits: Array<{
    title: string
    description: string
    icon: string
  }>
  categories: Array<{
    id: string
    name: string
    description: string
  }>
  licenses: LicenseType[]
  process: {
    title: string
    description: string
    steps: Array<{
      title: string
      description: string
    }>
  }
  faqs: Array<{
    question: string
    answer: string
  }>
}

export default function LicensingContent({ initialData }: { initialData: LicensingData | null }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  if (!initialData) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Error Loading Licensing Information
            </h1>
            <p className="text-slate-600">
              Sorry, we couldn't load the licensing information. Please try again later.
            </p>
          </div>
        </div>
      </main>
    )
  }

  // Group licenses by category
  const licensesByCategory = initialData?.licenses && Array.isArray(initialData.licenses) 
    ? initialData.licenses.reduce((acc, license) => {
        if (!acc[license.category]) {
          acc[license.category] = []
        }
        acc[license.category].push(license)
        return acc
      }, {} as Record<string, LicenseType[]>)
    : {} as Record<string, LicenseType[]>;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'building': return Building
      case 'music': return Music2
      case 'radio': return Radio
      case 'tv': return Tv
      case 'bus': return Bus
      case 'hotel': return Hotel
      case 'store': return Store
      case 'file': return FileText
      case 'calendar': return Calendar
      case 'check': return CheckCircle
      default: return Building
    }
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        title={initialData.hero.title}
        description={initialData.hero.description}
        image={initialData.hero.image}
      />

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Get Licensed?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {initialData.benefits.map((benefit, index) => {
              const IconComponent = getIconComponent(benefit.icon)
              return (
                <Card key={index} className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <IconComponent className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* License Types */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">License Types</h2>
          <Tabs defaultValue={initialData.categories[0].id} className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
              {initialData.categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {initialData.categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid md:grid-cols-2 gap-6">
                  {licensesByCategory[category.id]?.map((license) => (
                    <Card key={license.id} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{license.title}</h3>
                          <p className="text-slate-600 mb-4">{license.description}</p>
                          <div className="flex items-center text-sm text-slate-500 mb-4">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span>KES {license.price.toLocaleString()} / {license.duration}</span>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Benefits:</h4>
                              <ul className="list-disc list-inside text-slate-600 space-y-1">
                                {license.benefits.map((benefit, i) => (
                                  <li key={i}>{benefit}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Requirements:</h4>
                              <ul className="list-disc list-inside text-slate-600 space-y-1">
                                {license.requirements.map((req, i) => (
                                  <li key={i}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="mt-6 w-full">Apply Now</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{license.title} Application</DialogTitle>
                                <DialogDescription>
                                  Follow these steps to apply for your license
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  {license.applicationProcess.map((step, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                      <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {i + 1}
                                      </div>
                                      <p className="text-slate-600">{step}</p>
                                    </div>
                                  ))}
                                </div>
                                <div className="border-t pt-4">
                                  <h4 className="font-semibold mb-2">Required Documents:</h4>
                                  <div className="space-y-2">
                                    {license.documents.map((doc, i) => (
                                      <Button
                                        key={i}
                                        variant="outline"
                                        className="w-full justify-between"
                                        onClick={() => window.open(doc.url, '_blank')}
                                      >
                                        <span className="flex items-center">
                                          <FileText className="h-4 w-4 mr-2" />
                                          {doc.name}
                                        </span>
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{initialData.process.title}</h2>
            <p className="text-slate-600 mb-12">{initialData.process.description}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {initialData.process.steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-6 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </Card>
                {index < initialData.process.steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {initialData.faqs.map((faq, index) => (
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
          </div>
        </div>
      </section>
    </main>
  )
} 