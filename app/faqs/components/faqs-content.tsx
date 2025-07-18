'use client'

import React from 'react'
import { useState } from "react"
import PageHeader from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Search, Music2, DollarSign, Users, FileText, HelpCircle } from "lucide-react"

type FAQ = {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

type Category = {
  id: string
  name: string
  description: string
  icon: string
}

type FaqsData = {
  hero: {
    title: string
    description: string
    image: string
  }
  categories: Category[]
  faqs: FAQ[]
  support: {
    title: string
    description: string
    contact: {
      email: string
      phone: string
      hours: string
    }
    links: Array<{
      title: string
      description: string
      url: string
    }>
  }
}

export default function FaqsContent({ initialData }: { initialData: FaqsData | null }) {
  const [searchQuery, setSearchQuery] = useState('')

  if (!initialData) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Error Loading FAQs
            </h1>
            <p className="text-slate-600">
              Sorry, we couldn't load the FAQs content. Please try again later.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'music': return Music2
      case 'dollar': return DollarSign
      case 'users': return Users
      case 'file': return FileText
      case 'help': return HelpCircle
      default: return HelpCircle
    }
  }

  // Filter FAQs based on search query
  const filterFaqs = (faqs: FAQ[]) => {
    if (!searchQuery) return faqs
    const query = searchQuery.toLowerCase()
    return faqs.filter(faq =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Group FAQs by category
  const faqsByCategory = initialData.faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = []
    }
    acc[faq.category].push(faq)
    return acc
  }, {} as Record<string, FAQ[]>)

  return (
    <main className="min-h-screen">
      <PageHeader
        title={initialData.hero.title}
        description={initialData.hero.description}
        image={initialData.hero.image}
      />

      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                type="search"
                placeholder="Search FAQs..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={initialData.categories[0].id} className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-5 mb-8">
              {initialData.categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  <div className="flex flex-col items-center">
                    {React.createElement(getIconComponent(category.icon), {
                      className: "h-5 w-5 mb-2"
                    })}
                    {category.name}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            {initialData.categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="max-w-3xl mx-auto">
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                    <p className="text-slate-600 mb-8">{category.description}</p>
                    <Accordion type="single" collapsible className="w-full">
                      {filterFaqs(faqsByCategory[category.id] || []).map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="prose prose-slate max-w-none">
                              <p className="text-slate-600 whitespace-pre-wrap">
                                {faq.answer}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-4">
                                {(faq.tags || []).map((tag, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Support Section */}
      {initialData.support && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">{initialData.support?.title}</h2>
              <p className="text-xl text-slate-600 mb-12">{initialData.support?.description}</p>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Contact Support</h3>
                  <div className="space-y-4 text-slate-600">
                    <p>Email: {initialData.support.contact?.email}</p>
                    <p>Phone: {initialData.support.contact?.phone}</p>
                    <p>Hours: {initialData.support.contact?.hours}</p>
                  </div>
                  <Button className="mt-6 w-full" onClick={() => window.location.href = '/contact'}>
                    Contact Us
                  </Button>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Helpful Resources</h3>
                  <div className="space-y-4">
                    {(initialData.support.links || []).map((link, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-slate-900">{link.title}</h4>
                        <p className="text-slate-600 mb-2">{link.description}</p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.location.href = link.url}
                        >
                          Learn More
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
} 