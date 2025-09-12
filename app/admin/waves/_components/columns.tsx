'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'
import { format } from 'date-fns'
import Image from 'next/image'
import type { Wave } from '@/types'
export type { Wave }

export const columns: ColumnDef<Wave>[] = [
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
    accessorKey: 'coverArt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cover" />
    ),
    cell: ({ row }) => {
      const coverArt = row.getValue('coverArt') as string
      return (
        <div className="relative h-10 w-10">
          <Image
            src={coverArt}
            alt={row.getValue('title')}
            className="rounded-md object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue('title')}</span>
          <span className="text-sm text-muted-foreground">
            {row.original.album || '-'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'artist',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Artist" />
    ),
  },
  {
    accessorKey: 'genre',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Genre" />
    ),
  },
  {
    accessorKey: 'releaseDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Release Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue('releaseDate') as Date
      return format(new Date(date), 'MMM d, yyyy')
    },
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => {
      const duration = row.getValue('duration') as number
      const minutes = Math.floor(duration / 60)
      const seconds = duration % 60
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    },
  },
  {
    accessorKey: 'playCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plays" />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('status') as boolean
      return (
        <Badge variant={isActive ? 'success' : 'secondary'}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'isFeatured',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Featured" />
    ),
    cell: ({ row }) => {
      const isFeatured = row.getValue('isFeatured') as boolean
      return (
        <Badge variant={isFeatured ? 'default' : 'secondary'}>
          {isFeatured ? 'Featured' : 'No'}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const wave = row.original
      
      const deleteWave = async () => {
        try {
          // Add timeout to prevent hanging - increased to 20 seconds
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 20000) // 20 second timeout
          
          console.log('Attempting to delete wave:', wave.id)
          
          const response = await fetch(`/api/admin/waves/${wave.id}`, {
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
            throw new Error(`Failed to delete wave: ${response.status} ${errorText}`)
          }
          
          const result = await response.json()
          console.log('Delete successful:', result)
          
          // Invalidate cache after successful deletion
          await Promise.all([
            fetch('/api/revalidate?path=/admin/waves'),
            fetch('/api/revalidate?path=/waves')
          ])
          
          return Promise.resolve()
        } catch (error) {
          console.error('Error deleting wave:', error)
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
              href: `/admin/waves/${wave.id}/edit`,
            },
            {
              label: 'View',
              href: `/admin/waves/${wave.id}`,
            },
          ]}
          onDelete={deleteWave}
          itemName={wave.title}
          itemType="Wave"
        />
      )
    },
  },
] 