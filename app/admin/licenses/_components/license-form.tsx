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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import type { License } from '@/types'
import { Loader2 } from 'lucide-react'
import { format } from 'date-fns'

const formSchema = z.object({
  licenseNumber: z.string().min(1, 'License number is required'),
  licenseTypeId: z.string().min(1, 'License type is required'),
  memberId: z.string().min(1, 'Member is required'),
  status: z.enum(['pending', 'approved', 'rejected']),
  issuedAt: z.string().nullable(),
  expiresAt: z.string().nullable(),
})

type LicenseFormValues = z.infer<typeof formSchema>

interface LicenseFormProps {
  initialData?: License | null
  members: { id: string; name: string }[]
  licenseTypes: { id: string; title: string }[]
}

export function LicenseForm({ initialData, members, licenseTypes }: LicenseFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LicenseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenseNumber: initialData?.licenseNumber || '',
      licenseTypeId: initialData?.licenseTypeId || '',
      memberId: initialData?.memberId || '',
      status: initialData?.status || 'pending',
      issuedAt: initialData?.issuedAt || null,
      expiresAt: initialData?.expiresAt || null,
    },
  })

  async function onSubmit(data: LicenseFormValues) {
    try {
      setIsLoading(true)
      toast.success("Saving...")

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      let response: Response

      if (initialData) {
        response = await fetch(`/api/admin/licenses/${initialData.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          signal: controller.signal,
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || 'Failed to update license')
        }
      } else {
        response = await fetch('/api/admin/licenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          signal: controller.signal,
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || 'Failed to create license')
        }
      }

      clearTimeout(timeoutId)

      await Promise.all([
        fetch('/api/revalidate?path=/admin/licenses'),
        fetch('/api/revalidate?path=/licensing')
      ])
      
      toast.success(`License ${initialData ? 'updated' : 'created'} successfully.`)
      router.refresh()
      router.push('/admin/licenses')
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="licenseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License Number</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
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
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="memberId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Member</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="licenseTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License Type</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {licenseTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="issuedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    value={field.value || ''}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiresAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    value={field.value || ''}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            {initialData ? 'Update' : 'Create'} License
          </Button>
        </div>
      </form>
    </Form>
  )
} 