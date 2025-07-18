'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import PageHeader from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactData = {
  hero: {
    title: string
    description: string
    image: string
  }
  subjects: Array<{
    value: string
    label: string
  }>
  offices: Array<{
    name: string
    address: string
    phone: string
    email: string
    hours: string
    googleMapsUrl: string
  }>
  social: {
    title: string
    description: string
    links: Array<{
      platform: string
      url: string
      icon: string
    }>
  }
  // For backward compatibility with existing code
  socialMedia?: Array<{
    platform: string
    url: string
    icon: string
  }>
}

export default function ContactContent({ initialData }: { initialData: ContactData | null }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  if (!initialData) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Error Loading Contact Information
            </h1>
            <p className="text-slate-600">
              Sorry, we couldn't load the contact information. Please try again later.
            </p>
          </div>
        </div>
      </main>
    )
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      // Here you would typically make an API call to submit the form
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulated API call
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon.",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        title={initialData.hero.title}
        description={initialData.hero.description}
        image={initialData.hero.image}
      />

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Send Us a Message
              </h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+254 700 000000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {initialData.subjects.map((subject) => (
                                <SelectItem
                                  key={subject.value}
                                  value={subject.value}
                                >
                                  {subject.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message here..."
                            className="h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Offices</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialData.offices.map((office, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-bold mb-4">{office.name}</h3>
                <div className="space-y-4 text-slate-600">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <p>{office.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-600 mr-3" />
                    <p>{office.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <a
                      href={`mailto:${office.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {office.email}
                    </a>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <p>{office.hours}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(office.googleMapsUrl, '_blank')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Follow us on social media for the latest updates and announcements
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {initialData.socialMedia && initialData.socialMedia.map((link, index) => (
              <Button
                key={index}
                variant="secondary"
                size="lg"
                onClick={() => window.open(link.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {link.platform}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 