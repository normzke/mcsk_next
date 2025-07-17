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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Shield,
  Music2,
  DollarSign,
  Globe,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  Download,
  Clock,
  Award,
} from "lucide-react"

type MembershipCategory = {
  id: string
  title: string
  description: string
  features: string[]
  requirements: string[]
  fee: string
  duration: string
  benefits: string[]
  applicationSteps: string[]
  documents: Array<{
    name: string
    url: string
  }>
}

type MembershipData = {
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
  categories: MembershipCategory[]
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

export default function MembershipContent({ initialData }: { initialData: MembershipData | null }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  if (!initialData) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Error Loading Membership Information
            </h1>
            <p className="text-slate-600">
              Sorry, we couldn't load the membership information. Please try again later.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'shield': return Shield
      case 'music': return Music2
      case 'dollar': return DollarSign
      case 'globe': return Globe
      case 'users': return Users
      case 'file': return FileText
      case 'check': return CheckCircle
      case 'clock': return Clock
      case 'award': return Award
      default: return Shield
    }
  }

  // Fallback data in case initialData is undefined
  const heroData = initialData?.hero || {
    title: "MCSK Membership",
    description: "Join the Music Copyright Society of Kenya and protect your musical works",
    image: "/images/hero/membership-bg.jpg"
  };

  const benefitsData = initialData?.benefits || [
    {
      title: "Protect Your Music",
      description: "MCSK protects your musical works from unauthorized use",
      icon: "shield"
    },
    {
      title: "Get Paid for Your Music",
      description: "MCSK collects royalties on your behalf",
      icon: "dollar"
    },
    {
      title: "Join a Community of Musicians",
      description: "MCSK is a community of musicians working together",
      icon: "users"
    }
  ];

  const categoriesData = initialData?.categories || [
    {
      id: "individual",
      title: "Individual Membership",
      description: "For individual musicians",
      features: ["Protect your music", "Get paid for your music"],
      requirements: ["Be a musician", "Have a musical work"],
      fee: "KES 1,000",
      duration: "1 year",
      benefits: ["Protect your music", "Get paid for your music"],
      applicationSteps: ["Step 1: Fill out the application form", "Step 2: Pay the membership fee"],
      documents: [
        {
          name: "Application Form",
          url: "/documents/application-form.pdf"
        }
      ]
    }
  ];

  const processData = initialData?.process || {
    title: "Membership Application Process",
    description: "Follow these steps to apply for membership",
    steps: [
      {
        title: "Step 1: Fill out the application form",
        description: "Fill out the application form and submit it to MCSK"
      },
      {
        title: "Step 2: Pay the membership fee",
        description: "Pay the membership fee to complete your application"
      }
    ]
  };

  const faqsData = initialData?.faqs || [
    {
      question: "What is MCSK?",
      answer: "MCSK is the Music Copyright Society of Kenya"
    },
    {
      question: "How do I join MCSK?",
      answer: "Fill out the application form and pay the membership fee"
    }
  ];

  return (
    <main className="min-h-screen">
      <PageHeader
        title={heroData.title}
        description={heroData.description}
        image={heroData.image}
      />

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Member Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {(initialData?.benefits || benefitsData).map((benefit, index) => {
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

      {/* Membership Categories */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Membership Categories</h2>
          <Tabs defaultValue={(initialData?.categories?.[0]?.id || categoriesData[0].id)} className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
              {(initialData?.categories || categoriesData).map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {(initialData?.categories || categoriesData).map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card className="p-8">
                  <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                      <p className="text-slate-600">{category.description}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Features</h4>
                        <ul className="space-y-3">
                          {category.features?.map((feature, index) => (
                            <li key={index} className="flex items-center text-slate-600">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Requirements</h4>
                        <ul className="space-y-3">
                          {category.requirements?.map((requirement, index) => (
                            <li key={index} className="flex items-center text-slate-600">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-3" />
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-8 justify-center items-center mb-8 p-6 bg-slate-50 rounded-lg">
                      <div className="text-center">
                        <span className="text-sm text-slate-500">Registration Fee</span>
                        <p className="text-2xl font-bold text-slate-900">{category.fee}</p>
                      </div>
                      <div className="text-center">
                        <span className="text-sm text-slate-500">Membership Duration</span>
                        <p className="text-2xl font-bold text-slate-900">{category.duration}</p>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Apply Now</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{category.title} Membership Application</DialogTitle>
                          <DialogDescription>
                            Follow these steps to complete your membership application
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            {category.applicationSteps?.map((step, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </div>
                                <p className="text-slate-600">{step}</p>
                              </div>
                            ))}
                          </div>
                          <div className="border-t pt-4">
                            <h4 className="font-semibold mb-2">Required Documents:</h4>
                            <div className="space-y-2">
                              {category.documents?.map((doc, index) => (
                                <Button
                                  key={index}
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
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{initialData?.process?.title || processData.title}</h2>
            <p className="text-slate-600 mb-12">{initialData?.process?.description || processData.description}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-blue-200 md:left-1/2"></div>
              {(initialData?.process?.steps || processData.steps).map((step, index) => (
                <div key={index} className="relative flex items-center mb-8 md:justify-between">
                  <div className={`flex items-center md:w-1/2 ${
                    index % 2 === 0 ? 'md:justify-end' : ''
                  }`}>
                    <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                      {index + 1}
                    </div>
                    <div className={`ml-4 ${
                      index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                    }`}>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
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
              {(initialData?.faqs || faqsData).map((faq, index) => (
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