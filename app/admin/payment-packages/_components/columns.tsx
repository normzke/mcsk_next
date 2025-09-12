'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'
import { Button } from '@/components/ui/button'
import { Edit, Eye, DollarSign, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export type PaymentPackage = {
  id: string
  name: string
  description: string
  amount: string
  currency: string
  duration: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<PaymentPackage>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Package Name" />
    ),
    cell: ({ row }) => {
      const name = row.getValue('name') as string
      return <div className="font-medium">{name}</div>
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue('amount') as string
      const currency = row.original.currency
      return (
        <div className="flex items-center">
          <DollarSign className="mr-1 h-4 w-4 text-green-600" />
          <span className="font-mono">{currency} {parseFloat(amount).toLocaleString()}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => {
      const duration = row.getValue('duration') as string
      return <Badge variant="outline">{duration}</Badge>
    },
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean
      return isActive ? (
        <Badge>Active</Badge>
      ) : (
        <Badge variant="secondary">Inactive</Badge>
      )
    },
  },
  {
    accessorKey: 'order',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const package_ = row.original
      
      const deletePaymentPackage = async () => {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 20000) // 20 second timeout
          
          const response = await fetch(`/api/admin/payment-packages/${package_.id}`, {
            method: 'DELETE',
            signal: controller.signal,
          })
          
          clearTimeout(timeoutId)
          
          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Failed to delete payment package: ${response.status} ${errorText}`)
          }
          
          toast.success('Payment package deleted successfully!')
          
          // Invalidate cache
          await Promise.all([
            fetch('/api/revalidate?path=/admin/payment-packages'),
            fetch('/api/revalidate?path=/api/membership/apply'),
          ])
          
          // Refresh the page
          window.location.reload()
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            toast.error('Request timed out. Please try again.')
          } else {
            console.error('Delete payment package error:', error)
            toast.error(error instanceof Error ? error.message : 'Something went wrong')
          }
        }
      }
      
      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <Link href={`/admin/payment-packages/${package_.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <Link href={`/admin/payment-packages/${package_.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={deletePaymentPackage}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <DataTableRowActions
            row={row}
            actions={[
              {
                label: 'View',
                href: `/admin/payment-packages/${package_.id}`,
              },
              {
                label: 'Edit',
                href: `/admin/payment-packages/${package_.id}/edit`,
              },
              {
                label: 'Delete',
                onClick: deletePaymentPackage,
              },
            ]}
          />
        </div>
      )
    },
  },
] 