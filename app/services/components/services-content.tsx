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
import {
  Music2,
  DollarSign,
  Globe,
  Radio,
  Tv,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  Award,
  Banknote,
  PieChart,
  Shield,
  FileCheck,
} from "lucide-react"
import React from "react"

type Service = {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  benefits: string[]
  process: Array<{
    title: string
    description: string
  }>
}

type ServicesData = {
  hero: {
    title: string
    description: string
    image: string
  }
  overview: {
    title: string
    description: string
    stats: Array<{
      value: string
      label: string
      icon: string
    }>
  }
  categories: Array<{
    id: string
    name: string
    description: string
  }>
  services: Service[]
  testimonials: Array<{
    id: string
    name: string
    role: string
    company: string
    content: string
    image: string
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
}

export default function ServicesContent({ initialData }: { initialData: ServicesData | null }) {
  if (!initialData) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Error Loading Services
            </h1>
            <p className="text-slate-600">
              Sorry, we couldn't load the services content. Please try again later.
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
      case 'globe': return Globe
      case 'radio': return Radio
      case 'tv': return Tv
      case 'users': return Users
      case 'file': return FileText
      default: return Music2
    }
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
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{initialData.overview.title}</h2>
            <p className="text-slate-600">{initialData.overview.description}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {initialData.overview.stats.map((stat, index) => {
                const IconComponent = getIconComponent(stat.icon)
                return (
                  <Card key={index} className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <IconComponent className="h-12 w-12 text-blue-600 mb-4" />
                      <span className="text-3xl font-bold text-slate-900 mb-2">
                        {stat.value}
                      </span>
                      <span className="text-slate-600">{stat.label}</span>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
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
                  <div className="grid md:grid-cols-2 gap-8">
                    {initialData.services
                      .filter(service => service.id.startsWith(category.id))
                      .map((service) => (
                        <Card key={service.id} className="overflow-hidden">
                          <div className="p-6">
                            <div className="flex items-center mb-6">
                              {React.createElement(getIconComponent(service.icon), {
                                className: "h-8 w-8 text-blue-600 mr-4"
                              })}
                              <h3 className="text-xl font-bold">{service.title}</h3>
                            </div>
                            <p className="text-slate-600 mb-6">{service.description}</p>
                            <Accordion type="single" collapsible>
                              <AccordionItem value="features">
                                <AccordionTrigger>Features</AccordionTrigger>
                                <AccordionContent>
                                  <ul className="space-y-2">
                                    {service.features.map((feature, index) => (
                                      <li key={index} className="flex items-center text-slate-600">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="benefits">
                                <AccordionTrigger>Benefits</AccordionTrigger>
                                <AccordionContent>
                                  <ul className="space-y-2">
                                    {service.benefits.map((benefit, index) => (
                                      <li key={index} className="flex items-center text-slate-600">
                                        <ArrowRight className="h-5 w-5 text-blue-500 mr-2" />
                                        {benefit}
                                      </li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="process">
                                <AccordionTrigger>Process</AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-4">
                                    {service.process.map((step, index) => (
                                      <div key={index}>
                                        <div className="flex items-start">
                                          <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            {index + 1}
                                          </div>
                                          <div className="ml-4">
                                            <h4 className="font-semibold text-slate-900 mb-1">
                                              {step.title}
                                            </h4>
                                            <p className="text-slate-600">
                                              {step.description}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                            <Button className="w-full mt-6" onClick={() => window.location.href = '/contact'}>
                              Get Started
                            </Button>
                          </div>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {initialData.testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-6">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{testimonial.name}</h3>
                        <p className="text-sm text-slate-600">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-600 flex-grow">{testimonial.content}</p>
                  </div>
                </Card>
              ))}
            </div>
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