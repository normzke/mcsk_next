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
import { HeroSlide } from "../columns"
import Image from "next/image"

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const heroSlideFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  subtitle: z.string().min(10, {
    message: "Subtitle must be at least 10 characters.",
  }),
  image: z.union([
    z.custom<FileList>()
      .refine((files) => files?.length >= 1, "Image is required.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
    z.string()
  ]),
  order: z.number().min(1, {
    message: "Order must be at least 1.",
  }).max(100, {
    message: "Order must be less than 100.",
  }),
  status: z.enum(["active", "inactive"])
})

export type HeroSlideFormValues = z.infer<typeof heroSlideFormSchema>

const defaultValues: HeroSlideFormValues = {
  title: "",
  subtitle: "",
  image: "",
  order: 1,
  status: "inactive"
}

interface HeroSlideFormProps {
  initialData?: HeroSlide | null
  onSubmit: (data: HeroSlideFormValues) => void
}

export function HeroSlideForm({ initialData, onSubmit }: HeroSlideFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [previewImage, setPreviewImage] = React.useState<string | null>(
    initialData?.imageUrl || null
  )

  const form = useForm<HeroSlideFormValues>({
    resolver: zodResolver(heroSlideFormSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      subtitle: initialData.subtitle,
      image: initialData.imageUrl,
      order: initialData.order,
      status: initialData.status
    } : defaultValues
  })

  async function handleSubmit(data: HeroSlideFormValues) {
    try {
      setIsLoading(true)
      await onSubmit(data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter slide title" {...field} />
              </FormControl>
              <FormDescription>
                The main heading text for the slide.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter slide subtitle"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The supporting text that appears below the title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        onChange(e.target.files)
                        setPreviewImage(URL.createObjectURL(file))
                      }
                    }}
                    {...field}
                  />
                  {previewImage && (
                    <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-lg border">
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload an image for the slide. Recommended size: 1920x1080px.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={100} {...field} />
                </FormControl>
                <FormDescription>
                  The order in which this slide appears (1 being first).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Set whether this slide is visible on the website.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {initialData ? "Update" : "Create"} Slide
        </Button>
      </form>
    </Form>
  )
} 