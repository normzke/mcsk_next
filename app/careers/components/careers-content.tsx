'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PageHeader from "@/components/ui/page-header"
import { JobDialog } from "@/components/careers/job-dialog"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, Clock, MapPin } from "lucide-react"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: "full-time" | "part-time" | "contract"
  experience: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  deadline: string
}

interface CareersContentProps {
  initialData: {
    hero: {
      title: string
      description: string
      image: string
    }
    values: {
      title: string
      description: string
      items: {
        id: string
        title: string
        description: string
      }[]
    }
    jobs: Job[]
    benefits: {
      title: string
      categories: {
        id: string
        name: string
        items: string[]
      }[]
    }
  }
}

export default function CareersContent({ initialData }: CareersContentProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // Add fallback data for when properties are missing
  const fallbackData = {
    hero: {
      title: "Careers at MCSK",
      description: "Join our team and make a difference in the music industry",
      image: "/images/careers-hero.jpg"
    },
    values: {
      title: "Our Values",
      description: "What drives us every day",
      items: []
    },
    jobs: [],
    benefits: {
      title: "Employee Benefits",
      categories: []
    }
  }
  
  const { hero = fallbackData.hero, values = fallbackData.values, jobs = [], benefits = fallbackData.benefits } = initialData || {}

  const handleJobClick = (job: Job) => {
    setSelectedJob(job)
    setIsDialogOpen(true)
  }

  const getTypeColor = (type: Job["type"]) => {
    switch (type) {
      case "full-time":
        return "bg-emerald-100 text-emerald-800"
      case "part-time":
        return "bg-blue-100 text-blue-800"
      case "contract":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        title={hero.title}
        description={hero.description}
        image={hero.image}
      />

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{values?.title || "Our Values"}</h2>
          <p className="text-lg text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            {values?.description || "What drives us every day"}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {values?.items && Array.isArray(values.items) && values.items.length > 0 ? values.items.map((value) => (
              <Card key={value.id} className="p-6">
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <div className="text-slate-600">
                  <p>{value.description}</p>
                </div>
              </Card>
            )) : (
              <div className="col-span-3 text-center py-6">
                <p className="text-slate-600">Our core values guide everything we do at MCSK.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Current Openings</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {jobs && Array.isArray(jobs) && jobs.length > 0 ? jobs.map((job) => (
              <Card
                key={job.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleJobClick(job)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <p className="text-slate-600">{job.department}</p>
                  </div>
                  <Badge
                    className={`${getTypeColor(job.type)} capitalize`}
                    variant="secondary"
                  >
                    {job.type}
                  </Badge>
                </div>
                <div className="space-y-2 text-slate-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Apply by {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="w-full">View Details</Button>
                </div>
              </Card>
            )) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-slate-600">No job openings available at this time. Please check back later.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{benefits?.title || "Employee Benefits"}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {benefits?.categories && Array.isArray(benefits.categories) && benefits.categories.length > 0 ? benefits.categories.map((category) => (
              <Card key={category.id} className="p-6">
                <h3 className="text-lg font-bold mb-3">{category.name}</h3>
                <ul className="space-y-2 text-slate-600">
                  {category.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Card>
            )) : (
              <div className="col-span-4 text-center py-10">
                <p className="text-slate-600">Employee benefits information will be available soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <JobDialog
        job={selectedJob}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </main>
  )
}
