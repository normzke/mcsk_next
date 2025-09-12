'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import type { SeoMeta } from '@/types'
import { Loader2 } from 'lucide-react'
import { ImageUpload } from '@/components/ui/image-upload'

const formSchema = z.object({
  path: z.string().min(1, 'Path is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  keywords: z.string().optional(),
  ogImage: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
})

type SEOFormValues = z.infer<typeof formSchema>

interface SEOFormProps {
  initialData?: SeoMeta | null
}

export function SEOForm({ initialData }: SEOFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SEOFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      path: initialData?.path || '',
      title: initialData?.title || '',
      description: initialData?.description || '',
      keywords: initialData?.keywords || '',
      ogImage: initialData?.ogImage || '',
      ogTitle: initialData?.ogTitle || '',
      ogDescription: initialData?.ogDescription || '',
    },
  })

  async function onSubmit(data: SEOFormValues) {
    try {
      setIsLoading(true)
      toast.success("Saving...")

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      let response: Response

      if (initialData) {
        response = await fetch(`/api/admin/seo/${initialData.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          signal: controller.signal,
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || 'Failed to update SEO meta')
        }
      } else {
        response = await fetch('/api/admin/seo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          signal: controller.signal,
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || 'Failed to create SEO meta')
        }
      }

      clearTimeout(timeoutId)

      await Promise.all([
        fetch('/api/revalidate?path=/admin/seo'),
        fetch(`/api/revalidate?path=${data.path}`)
      ])
      
      toast.success(`SEO meta ${initialData ? 'updated' : 'created'} successfully.`)
      router.refresh()
      router.push('/admin/seo')
    } catch (error) {
      console.error(error)
      if (error instanceof Error && error.name === 'AbortError') {
        toast.error('Request timed out. Please try again.')
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.'
        toast.error(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8">
          <FormField
            control={form.control}
            name="path"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Path</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormDescription>
                  The URL path for this page (e.g., /about, /contact)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormDescription>
                  The page title that appears in search results and browser tabs
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} disabled={isLoading} />
                </FormControl>
                <FormDescription>
                  A brief description of the page content for search results
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keywords</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormDescription>
                  Comma-separated keywords for search engines
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Open Graph Settings</h3>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="ogTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OG Title</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>
                      The title that appears when shared on social media
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ogDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OG Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={isLoading} />
                    </FormControl>
                    <FormDescription>
                      The description that appears when shared on social media
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ogImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OG Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value || null}
                        onChange={field.onChange}
                        onRemove={() => field.onChange(null)}
                      />
                    </FormControl>
                    <FormDescription>
                      The image that appears when shared on social media
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="mr-2"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Update' : 'Create'} SEO Meta
          </Button>
        </div>
      </form>
    </Form>
  )
} 