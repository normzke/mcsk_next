'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
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
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.string().min(1, 'Amount is required'),
  currency: z.string().min(1, 'Currency is required'),
  duration: z.string().min(1, 'Duration is required'),
  order: z.number().min(0, 'Order must be 0 or greater'),
  isActive: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

interface PaymentPackageFormProps {
  initialData?: {
    id?: string
    name?: string
    description?: string
    amount?: string
    currency?: string
    duration?: string
    order?: number
    isActive?: boolean
  }
}

const currencyOptions = [
  { value: 'KES', label: 'Kenyan Shilling (KES)' },
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
]

const durationOptions = [
  { value: 'Lifetime', label: 'Lifetime' },
  { value: 'Annual', label: 'Annual' },
  { value: 'Monthly', label: 'Monthly' },
  { value: 'Quarterly', label: 'Quarterly' },
]

export default function PaymentPackageForm({ initialData }: PaymentPackageFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      amount: initialData?.amount || '',
      currency: initialData?.currency || 'KES',
      duration: initialData?.duration || '',
      order: initialData?.order || 0,
      isActive: initialData?.isActive ?? true,
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout
      
      const response = await fetch(
        initialData?.id 
          ? `/api/admin/payment-packages/${initialData.id}` 
          : '/api/admin/payment-packages',
        {
          method: initialData?.id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            amount: parseFloat(data.amount),
          }),
          signal: controller.signal,
        }
      )
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to ${initialData?.id ? 'update' : 'create'} payment package: ${response.status} ${errorText}`)
      }
      
      toast.success(`Payment package ${initialData?.id ? 'updated' : 'created'} successfully!`)
      
      // Invalidate cache
      await Promise.all([
        fetch('/api/revalidate?path=/admin/payment-packages'),
        fetch('/api/revalidate?path=/api/membership/apply'),
      ])
      
      router.push('/admin/payment-packages')
      router.refresh()
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        toast.error('Request timed out. Please try again.')
      } else {
        console.error('Payment package submission error:', error)
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Link href="/admin/payment-packages">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {initialData?.id ? 'Edit' : 'Create'} Payment Package
          </h2>
          <p className="text-muted-foreground">
            {initialData?.id ? 'Update' : 'Add'} a payment package for membership
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Composer Membership" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    The name of the payment package
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      step="0.01"
                      placeholder="1000.00" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    The cost of the package
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="KES" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    The currency for the package
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Lifetime, Annual, Monthly" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    The duration of the package
                  </FormDescription>
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
                    placeholder="Describe the package benefits and features..." 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Detailed description of the package
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="0" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Order in which this package appears (lower numbers first)
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
                      Enable or disable this payment package
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

          <div className="flex justify-end space-x-2">
            <Link href="/admin/payment-packages">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : initialData?.id ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
} 