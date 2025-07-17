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
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Loader2, Upload } from 'lucide-react'

interface FormProps<T extends z.ZodObject<any, any>> {
  schema: T
  onSubmit: (values: z.infer<T>) => Promise<void>
  defaultValues?: Partial<z.infer<T>>
  fields: {
    name: keyof z.infer<T>
    label: string
    type: 'text' | 'textarea' | 'number' | 'file' | 'date' | 'email'
    description?: string
    placeholder?: string
    accept?: string
  }[]
  submitLabel?: string
  className?: string
}

export function AdminForm<T extends z.ZodObject<any, any>>({
  schema,
  onSubmit,
  defaultValues,
  fields,
  submitLabel = 'Save',
  className,
}: FormProps<T>) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  })

  async function handleSubmit(values: z.infer<T>) {
    try {
      setIsLoading(true)
      await onSubmit(values)
      toast({
        title: 'Success',
        description: 'Your changes have been saved.',
      })
      router.refresh()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('space-y-6', className)}
      >
        {fields.map((field) => (
          <FormField
            key={field.name as string}
            control={form.control}
            name={field.name as string}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === 'textarea' ? (
                    <Textarea
                      {...formField}
                      placeholder={field.placeholder}
                      disabled={isLoading}
                    />
                  ) : field.type === 'file' ? (
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept={field.accept}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            formField.onChange(file)
                          }
                        }}
                        disabled={isLoading}
                        className="hidden"
                        id={field.name as string}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          document.getElementById(field.name as string)?.click()
                        }}
                        disabled={isLoading}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload {field.label}
                      </Button>
                      {formField.value && (
                        <span className="text-sm text-muted-foreground">
                          {(formField.value as File).name}
                        </span>
                      )}
                    </div>
                  ) : (
                    <Input
                      {...formField}
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled={isLoading}
                    />
                  )}
                </FormControl>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
} 