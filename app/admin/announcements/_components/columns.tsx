'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import type { Announcement } from '@/types'

export const columns: ColumnDef<Announcement>[] = [
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
    accessorKey: 'image',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const image = row.getValue('image') as string
      return image ? (
        <div className="relative h-10 w-16">
          <Image
            src={image}
            alt={row.getValue('title')}
            className="rounded-md object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : null
    },
    enableSorting: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
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
      const announcement = row.original
      
      const deleteAnnouncement = async () => {
        try {
          // Add timeout to prevent hanging - increased to 20 seconds
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 20000) // 20 second timeout
          
          console.log('Attempting to delete announcement:', announcement.id)
          
          const response = await fetch(`/api/admin/announcements/${announcement.id}`, {
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
            throw new Error(`Failed to delete announcement: ${response.status} ${errorText}`)
          }
          
          const result = await response.json()
          console.log('Delete successful:', result)
          
          // Invalidate cache after successful deletion
          await Promise.all([
            fetch('/api/revalidate?path=/admin/announcements'),
            fetch('/api/revalidate?path=/announcements')
          ])
          
          return Promise.resolve()
        } catch (error) {
          console.error('Error deleting announcement:', error)
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
              href: `/admin/announcements/${announcement.id}/edit`,
            },
            {
              label: 'View',
              href: `/admin/announcements/${announcement.id}`,
            },
          ]}
          onDelete={deleteAnnouncement}
          itemName={announcement.title}
          itemType="Announcement"
        />
      )
    },
  },
] 