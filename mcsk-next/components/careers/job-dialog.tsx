'use client'

import * as React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { MapPin, Briefcase, Clock, Upload } from "lucide-react"
import { sendEmail, TEMPLATE_IDS } from "@/lib/email-service"

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

interface JobDialogProps {
  job: Job | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function JobDialog({ job, open, onOpenChange }: JobDialogProps) {
  const [showApplication, setShowApplication] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // Send application email
      await sendEmail(TEMPLATE_IDS.JOB_APPLICATION, {
        job_title: job?.title,
        applicant_name: formData.get('name'),
        applicant_email: formData.get('email'),
        applicant_phone: formData.get('phone'),
        cover_letter: formData.get('coverLetter'),
      })

      toast({
        title: "Application Submitted",
        description: "We will review your application and get back to you soon.",
      })
      onOpenChange(false)
      setShowApplication(false)
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!job) return null

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {!showApplication ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{job.title}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    className={`${getTypeColor(job.type)} capitalize`}
                    variant="secondary"
                  >
                    {job.type}
                  </Badge>
                  <span className="text-slate-600">• {job.department}</span>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
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

              <div>
                <h3 className="text-lg font-semibold mb-2">About the Role</h3>
                <p className="text-slate-600">{job.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {job.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {job.benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <Button
                className="w-full"
                onClick={() => setShowApplication(true)}
              >
                Apply Now
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Apply for {job.title}</DialogTitle>
              <DialogDescription>
                Please fill out the application form below
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    required
                    placeholder="Tell us why you're interested in this position"
                    className="h-32"
                  />
                </div>

                <div>
                  <Label htmlFor="resume">Resume/CV</Label>
                  <div className="mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Resume/CV
                    </Button>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    PDF, DOC, or DOCX up to 5MB
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowApplication(false)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
} 