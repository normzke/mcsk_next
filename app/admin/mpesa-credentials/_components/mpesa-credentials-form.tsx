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
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, Shield } from 'lucide-react'
import Link from 'next/link'

const formSchema = z.object({
  environment: z.string().min(1, 'Environment is required'),
  consumerKey: z.string().min(1, 'Consumer Key is required'),
  consumerSecret: z.string().min(1, 'Consumer Secret is required'),
  passkey: z.string().min(1, 'Passkey is required'),
  shortcode: z.string().min(1, 'Shortcode is required'),
  businessName: z.string().min(1, 'Business Name is required'),
  isActive: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

interface MpesaCredentialsFormProps {
  initialData?: {
    id?: string
    environment?: string
    consumerKey?: string
    consumerSecret?: string
    passkey?: string
    shortcode?: string
    businessName?: string
    isActive?: boolean
  }
}

const environmentOptions = [
  { value: 'sandbox', label: 'Sandbox (Testing)' },
  { value: 'production', label: 'Production (Live)' },
]

export default function MpesaCredentialsForm({ initialData }: MpesaCredentialsFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      environment: initialData?.environment || 'sandbox',
      consumerKey: initialData?.consumerKey || '',
      consumerSecret: initialData?.consumerSecret || '',
      passkey: initialData?.passkey || '',
      shortcode: initialData?.shortcode || '',
      businessName: initialData?.businessName || '',
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
          ? `/api/admin/mpesa-credentials/${initialData.id}` 
          : '/api/admin/mpesa-credentials',
        {
          method: initialData?.id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          signal: controller.signal,
        }
      )
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to ${initialData?.id ? 'update' : 'create'} M-Pesa credentials: ${response.status} ${errorText}`)
      }
      
      toast.success(`M-Pesa credentials ${initialData?.id ? 'updated' : 'created'} successfully!`)
      
      // Invalidate cache
      await Promise.all([
        fetch('/api/revalidate?path=/admin/mpesa-credentials'),
      ])
      
      router.push('/admin/mpesa-credentials')
      router.refresh()
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        toast.error('Request timed out. Please try again.')
      } else {
        console.error('M-Pesa credentials submission error:', error)
        toast.error(error instanceof Error ? error.message : 'Something went wrong')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Link href="/admin/mpesa-credentials">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {initialData?.id ? 'Edit' : 'Create'} M-Pesa Credentials
          </h2>
          <p className="text-muted-foreground">
            {initialData?.id ? 'Update' : 'Add'} M-Pesa API credentials for payment processing
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-yellow-600" />
          <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
        </div>
        <p className="text-sm text-yellow-700 mt-1">
          These credentials are used for M-Pesa payment processing. Ensure they are kept secure and not shared publicly.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="environment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Environment</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="sandbox or production" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    The M-Pesa environment (sandbox for testing, production for live)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="MCSK Kenya" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    The business name for M-Pesa transactions
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="consumerKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consumer Key</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="Your M-Pesa Consumer Key" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    The M-Pesa API consumer key
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consumerSecret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consumer Secret</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="Your M-Pesa Consumer Secret" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    The M-Pesa API consumer secret
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="passkey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passkey</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="Your M-Pesa Passkey" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    The M-Pesa API passkey for encryption
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shortcode</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., 174379" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    The M-Pesa business shortcode
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active</FormLabel>
                  <FormDescription>
                    Enable or disable these M-Pesa credentials
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

          <div className="flex justify-end space-x-2">
            <Link href="/admin/mpesa-credentials">
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