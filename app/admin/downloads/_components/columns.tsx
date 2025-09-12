'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'
import type { Download } from '@/types'

export const columns: ColumnDef<Download>[] = [
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
    accessorKey: 'file',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="File" />
    ),
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
      const download = row.original
      
      const deleteDownload = async () => {
        try {
          // Add timeout to prevent hanging
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
          
          const response = await fetch(`/api/admin/downloads/${download.id}`, {
            method: 'DELETE',
            signal: controller.signal,
          })
          
          clearTimeout(timeoutId)
          
          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Failed to delete download: ${response.status} ${errorText}`)
          }
          
          // Invalidate cache after successful deletion
          await fetch('/api/revalidate?path=/admin/downloads')
          await fetch('/api/revalidate?path=/downloads')
          
          return Promise.resolve()
        } catch (error) {
          console.error('Error deleting download:', error)
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
              href: `/admin/downloads/${download.id}/edit`,
            },
            {
              label: 'View',
              href: `/admin/downloads/${download.id}`,
            },
          ]}
          onDelete={deleteDownload}
          itemName={download.title}
          itemType="Download"
        />
      )
    },
  },
] 