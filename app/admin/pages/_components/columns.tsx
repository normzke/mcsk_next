'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'
import type { Page } from '@/types'

export const columns: ColumnDef<Page>[] = [
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
    accessorKey: 'slug',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean
      return (
        <Badge variant={isActive ? 'success' : 'secondary'}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const page = row.original
      
      const deletePage = async () => {
        try {
          // Add timeout to prevent hanging - increased to 20 seconds
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 20000) // 20 second timeout
          
          console.log('Attempting to delete page:', page.id)
          
          const response = await fetch(`/api/admin/pages/${page.id}`, {
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
            throw new Error(`Failed to delete page: ${response.status} ${errorText}`)
          }
          
          const result = await response.json()
          console.log('Delete successful:', result)
          
          // Invalidate cache after successful deletion
          await Promise.all([
            fetch('/api/revalidate?path=/admin/pages'),
            fetch('/api/revalidate?path=/pages')
          ])
          
          return Promise.resolve()
        } catch (error) {
          console.error('Error deleting page:', error)
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
              href: `/admin/pages/${page.id}/edit`,
            },
            {
              label: 'View',
              href: `/admin/pages/${page.id}`,
            },
          ]}
          onDelete={deletePage}
          itemName={page.title}
          itemType="Page"
        />
      )
    },
  },
] 