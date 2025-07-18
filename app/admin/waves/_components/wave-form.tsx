'use client'

import { useState } from "react"
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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import type { Wave } from '@/types'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  artist: z.string().min(2, {
    message: 'Artist must be at least 2 characters.',
  }),
  album: z.string().nullable(),
  genre: z.string(),
  releaseDate: z.union([z.string(), z.instanceof(Date)]),
  duration: z.number().positive(),
  coverArt: z.string(),
  audioFile: z.string(),
  status: z.boolean(),
  isFeatured: z.boolean(),
  isrcCode: z.string(),
  lyrics: z.string().nullable(),
  description: z.string().nullable(),
  copyrightInfo: z.string(),
})

type WaveFormValues = z.infer<typeof formSchema>

interface WaveFormProps {
  initialData?: Wave | null
}

export function WaveForm({ initialData }: WaveFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<WaveFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      artist: initialData?.artist || '',
      album: initialData?.album || null,
      genre: initialData?.genre || '',
      releaseDate: initialData?.releaseDate || '',
      duration: initialData?.duration || 0,
      coverArt: initialData?.coverArt || '',
      audioFile: initialData?.audioFile || '',
      status: initialData?.status ?? false,
      isFeatured: initialData?.isFeatured ?? false,
      isrcCode: initialData?.isrcCode || '',
      lyrics: initialData?.lyrics || null,
      description: initialData?.description || null,
      copyrightInfo: initialData?.copyrightInfo || '',
    },
  })

  async function onSubmit(data: WaveFormValues) {
    setIsLoading(true)

    try {
      // TODO: Implement API call
      if (initialData) {
        // Update existing wave
      } else {
        // Create new wave
      }

      toast({
        title: "Success",
        description: `Wave ${initialData ? "updated" : "created"} successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter wave title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="artist"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artist</FormLabel>
                <FormControl>
                  <Input placeholder="Enter artist name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="album"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Album</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter album name" 
                    {...field} 
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input placeholder="Enter genre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="releaseDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value} 
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (seconds)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter duration in seconds" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isrcCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISRC Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ISRC code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="copyrightInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copyright Info</FormLabel>
                <FormControl>
                  <Input placeholder="Enter copyright information" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="coverArt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Art URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter cover art URL" {...field} />
                </FormControl>
                <FormDescription>
                  URL to the cover art image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="audioFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Audio File URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter audio file URL" {...field} />
                </FormControl>
                <FormDescription>
                  URL to the audio file
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active Status</FormLabel>
                  <FormDescription>
                    Set the wave as active or inactive
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Featured</FormLabel>
                  <FormDescription>
                    Feature this wave on the homepage
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter wave description" 
                    className="min-h-[100px]" 
                    {...field} 
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lyrics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lyrics</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter lyrics" 
                    className="min-h-[200px]" 
                    {...field} 
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {initialData ? "Update" : "Create"} Wave
        </Button>
      </form>
    </Form>
  )
}
