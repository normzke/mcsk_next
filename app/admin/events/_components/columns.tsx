'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'
import { format } from 'date-fns'
import type { Event } from '@/types'

export const columns: ColumnDef<Event>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
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
      const imageUrl = row.getValue('image') as string | null
      return imageUrl ? (
        <div className="relative w-20 h-12 rounded overflow-hidden">
          <img
            src={imageUrl}
            alt={row.getValue('title')}
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="text-muted-foreground">No image</div>
      )
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: 'venue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Venue" />
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue('date') as string
      return <div>{new Date(date).toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: 'startTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    cell: ({ row }) => {
      const startTime = row.getValue('startTime') as string | null
      return startTime ? new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'
    },
  },
  {
    accessorKey: 'endTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time" />
    ),
    cell: ({ row }) => {
      const endTime = row.getValue('endTime') as string | null
      return endTime ? new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'
    },
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      const location = row.getValue('location') as string | null
      const venue = row.original.venue
      return (
        <div className="flex flex-col">
          <span className="font-medium">{location || '-'}</span>
          {venue && (
            <span className="text-sm text-muted-foreground">{venue}</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
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
      const event = row.original
      
      const deleteEvent = async () => {
        try {
          // Add timeout to prevent hanging - increased to 20 seconds
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 20000) // 20 second timeout
          
          console.log('Attempting to delete event:', event.id)
          
          const response = await fetch(`/api/admin/events/${event.id}`, {
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
            throw new Error(`Failed to delete event: ${response.status} ${errorText}`)
          }
          
          const result = await response.json()
          console.log('Delete successful:', result)
          
          // Invalidate cache after successful deletion
          await Promise.all([
            fetch('/api/revalidate?path=/admin/events'),
            fetch('/api/revalidate?path=/events')
          ])
          
          return Promise.resolve()
        } catch (error) {
          console.error('Error deleting event:', error)
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
              href: `/admin/events/${event.id}/edit`,
            },
            {
              label: 'View',
              href: `/admin/events/${event.id}`,
            },
          ]}
          onDelete={deleteEvent}
          itemName={event.title}
          itemType="Event"
        />
      )
    },
  },
] 