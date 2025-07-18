'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import type { Job } from '@/types'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  department: z.string().min(1, 'Department is required'),
  location: z.string().min(1, 'Location is required'),
  type: z.enum(['full-time', 'part-time', 'contract']),
  experience: z.string().min(1, 'Experience is required'),
  description: z.string().min(1, 'Description is required'),
  responsibilities: z.array(z.string()).min(1, 'At least one responsibility is required'),
  requirements: z.array(z.string()).min(1, 'At least one requirement is required'),
  benefits: z.array(z.string()).min(1, 'At least one benefit is required'),
  deadline: z.string().min(1, 'Deadline is required'),
})

type JobFormValues = z.infer<typeof formSchema>

interface JobFormProps {
  initialData?: Job
}

export function JobForm({ initialData }: JobFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<JobFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      department: initialData.department,
      location: initialData.location,
      type: initialData.type,
      experience: initialData.experience,
      description: initialData.description,
      responsibilities: initialData.responsibilities,
      requirements: initialData.requirements,
      benefits: initialData.benefits,
      deadline: initialData.deadline,
    } : {
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      experience: '',
      description: '',
      responsibilities: [''],
      requirements: [''],
      benefits: [''],
      deadline: '',
    },
  })

  const onSubmit = async (values: JobFormValues) => {
    try {
      setIsLoading(true)

      const response = await fetch(
        initialData
          ? `/api/admin/careers/${initialData.id}`
          : "/api/admin/careers",
        {
          method: initialData ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      )

      if (!response.ok) {
        throw new Error("Something went wrong")
      }

      toast.success(
        initialData
          ? "Job updated successfully"
          : "Job created successfully"
      )
      router.refresh()
      router.push("/admin/careers")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Senior Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="licensing">Licensing</SelectItem>
                    <SelectItem value="rights_management">Rights Management</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="nairobi">Nairobi</SelectItem>
                    <SelectItem value="mombasa">Mombasa</SelectItem>
                    <SelectItem value="kisumu">Kisumu</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 3-5 years" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application Deadline</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter job description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsibilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsibilities</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {field.value.map((_, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Responsibility ${index + 1}`}
                        value={field.value[index]}
                        onChange={(e) => {
                          const newValue = [...field.value]
                          newValue[index] = e.target.value
                          field.onChange(newValue)
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          const newValue = field.value.filter((_, i) => i !== index)
                          field.onChange(newValue)
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      field.onChange([...field.value, ""])
                    }}
                  >
                    Add Responsibility
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {field.value.map((_, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Requirement ${index + 1}`}
                        value={field.value[index]}
                        onChange={(e) => {
                          const newValue = [...field.value]
                          newValue[index] = e.target.value
                          field.onChange(newValue)
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          const newValue = field.value.filter((_, i) => i !== index)
                          field.onChange(newValue)
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      field.onChange([...field.value, ""])
                    }}
                  >
                    Add Requirement
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Benefits</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {field.value.map((_, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Benefit ${index + 1}`}
                        value={field.value[index]}
                        onChange={(e) => {
                          const newValue = [...field.value]
                          newValue[index] = e.target.value
                          field.onChange(newValue)
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          const newValue = field.value.filter((_, i) => i !== index)
                          field.onChange(newValue)
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      field.onChange([...field.value, ""])
                    }}
                  >
                    Add Benefit
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/careers")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData ? "Update Job" : "Create Job"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 