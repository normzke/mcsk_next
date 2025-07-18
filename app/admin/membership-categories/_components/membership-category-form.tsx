'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
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
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import type { MembershipCategory } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

// Define the form schema with explicit typing for better TypeScript support
const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  features: z.array(z.string().min(1, 'Feature cannot be empty')),
  order: z.number().nullable(),
  isActive: z.boolean(),
})

// Define the form values type explicitly to help with TypeScript inference
type FormValues = {
  title: string;
  features: string[];
  order: number | null;
  isActive: boolean;
}

type MembershipCategoryFormValues = z.infer<typeof formSchema>

interface MembershipCategoryFormProps {
  initialData?: MembershipCategory | null
}

export function MembershipCategoryForm({ initialData }: MembershipCategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Use our explicit FormValues type
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      features: initialData?.features || [],
      order: initialData?.order || null,
      isActive: initialData?.isActive ?? false,
    },
  })

  // Use a type assertion to work around the TypeScript error
  const { fields, append, remove } = useFieldArray({ 
    name: "features",
    control: form.control
  } as any)

  async function onSubmit(data: MembershipCategoryFormValues) {
    setIsLoading(true)

    try {
      // TODO: Implement API call
      if (initialData) {
        // Update existing category
      } else {
        // Create new category
      }

      toast({
        title: "Success",
        description: `Membership category ${initialData ? "updated" : "created"} successfully.`,
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
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter category title" {...field} />
              </FormControl>
              <FormDescription>
                The name of this membership category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`features.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Enter feature" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => append("")}
            >
              Add Feature
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter display order"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                  />
                </FormControl>
                <FormDescription>
                  Optional display order for sorting.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active</FormLabel>
                  <FormDescription>
                    Make this category visible on the website
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

        <Button type="submit" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {initialData ? "Update" : "Create"} Category
        </Button>
      </form>
    </Form>
  )
} 