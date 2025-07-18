'use client'

import * as React from "react"
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
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { ManagementMember } from "@/types"
import Image from "next/image"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const phoneRegex = /^(?:\+254|0)[17]\d{8}$/

const managementFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  image: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).nullable().optional(),
  phone: z.string().regex(phoneRegex, {
    message: "Please enter a valid phone number.",
  }).nullable().optional(),
  linkedinUrl: z.string().url({
    message: "Please enter a valid URL.",
  }).nullable().optional(),
  twitterUrl: z.string().url({
    message: "Please enter a valid URL.",
  }).nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional()
})

export type ManagementFormValues = z.infer<typeof managementFormSchema>

interface ManagementFormProps {
  member?: ManagementMember | null
}

export function ManagementForm({ member }: ManagementFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [previewImage, setPreviewImage] = React.useState<string | null>(
    member?.image || null
  )

  const form = useForm<ManagementFormValues>({
    resolver: zodResolver(managementFormSchema) as any, // Temporary any cast due to type issues with zodResolver
    defaultValues: member
      ? {
          ...member,
          // Ensure all optional fields are properly set
          image: member.image || undefined,
          bio: member.bio || undefined,
          email: member.email || undefined,
          phone: member.phone || undefined,
          linkedinUrl: member.linkedinUrl || undefined,
          twitterUrl: member.twitterUrl || undefined,
          // Ensure dates are properly handled
          createdAt: member.createdAt ? new Date(member.createdAt) : undefined,
          updatedAt: member.updatedAt ? new Date(member.updatedAt) : undefined,
          deletedAt: member.deletedAt ? new Date(member.deletedAt) : undefined,
        }
      : {
          name: "",
          position: "",
          order: 0,
          isActive: true,
          // All other fields are optional and will be undefined by default
        },
  })

  async function onSubmit(data: ManagementFormValues) {
    setIsLoading(true)

    try {
      const url = member 
        ? `/api/admin/management/${member.id}`
        : '/api/admin/management';
      
      const method = member ? 'PATCH' : 'POST';
      
      // Prepare the data to send
      const formData = {
        ...data,
        // Convert empty strings to null for optional fields
        email: data.email || null,
        phone: data.phone || null,
        bio: data.bio || null,
        linkedinUrl: data.linkedinUrl || null,
        twitterUrl: data.twitterUrl || null,
        // Ensure image is either a string or null
        image: data.image || null,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save management member');
      }

      const result = await response.json();
      
      toast({
        title: "Success",
        description: `Management member ${member ? "updated" : "created"} successfully.`,
      });
      
      // Redirect to management members list
      router.push('/admin/management');
      router.refresh();
      
    } catch (error) {
      console.error('Error saving management member:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter full name" 
                    value={field.value || ''} 
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter position" 
                    value={field.value || ''} 
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </FormControl>
                <FormDescription>
                  Format: +254XXXXXXXXX or 07XXXXXXXX
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Photo</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          const imageUrl = reader.result as string
                          field.onChange(imageUrl)
                          setPreviewImage(imageUrl)
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                  {(previewImage || field.value) && (
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border">
                      <Image
                        src={previewImage || field.value || ''}
                        alt="Profile preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload a profile photo. Maximum size 5MB.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-8 md:grid-cols-2">
          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://twitter.com/username"
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Display order"
                    value={field.value ?? 0}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </FormControl>
                <FormDescription>
                  Lower numbers appear first in the list
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Active</FormLabel>
                  <FormDescription>
                    Uncheck to hide this member from the public site
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter bio"
                  className="min-h-[120px]"
                  value={field.value || ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
              </FormControl>
              <FormDescription>
                A brief biography highlighting the member's experience and qualifications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {member ? "Update" : "Create"} Management Member
        </Button>
      </form>
    </Form>
  )
} 