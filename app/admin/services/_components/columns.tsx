'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'
import type { Service } from '@/types'

export const columns: ColumnDef<Service>[] = [
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
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const description = row.getValue('description') as string
      return <div className="max-w-[500px] truncate">{description}</div>
    },
  },
  {
    accessorKey: 'order',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" />
    ),
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
    id: 'actions',
    cell: ({ row }) => {
      const service = row.original
      
      const deleteService = async () => {
        try {
          // Add timeout to prevent hanging - increased to 20 seconds
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 20000) // 20 second timeout
          
          console.log('Attempting to delete service:', service.id)
          
          const response = await fetch(`/api/admin/services/${service.id}`, {
            method: 'DELETE',
            signal: controller.signal,
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          clearTimeout(timeoutId)
          
          console.log('Delete response status:', response.status)
          
          if (!response.ok) {
            const errorText = await response.text()
            console.error('Delete failed with status:', response.status, 'Error:', errorText)
            throw new Error(`Failed to delete service: ${response.status} ${errorText}`)
          }
          
          const result = await response.json()
          console.log('Delete successful:', result)
          
          // Invalidate cache after successful deletion
          await Promise.all([
            fetch('/api/revalidate?path=/admin/services'),
            fetch('/api/revalidate?path=/services')
          ])
          
          return Promise.resolve()
        } catch (error) {
          console.error('Error deleting service:', error)
          if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Delete request timed out. Please try again.')
          }
          return Promise.reject(error)
        }
      }
      
      return (
        <DataTableRowActions
          row={row}
          actions={[
            {
              label: 'Edit',
              href: `/admin/services/${service.id}/edit`,
            },
            {
              label: 'View',
              href: `/admin/services/${service.id}`,
            },
          ]}
          onDelete={deleteService}
          itemName={service.title}
          itemType="Service"
        />
      )
    },
  },
] 