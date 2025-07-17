'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'
import Image from 'next/image'

// Define the shape of a Gallery item, assuming it's similar to the public data
// This might need adjustment based on the actual Prisma schema for the Gallery model
export type GalleryItem = {
  id: string
  title: string
  url: string // Assuming a direct URL for the item
  type: 'image' | 'video'
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  // Add other relevant fields from your Prisma schema
}

export const columns: ColumnDef<GalleryItem>[] = [
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
    accessorKey: 'url',
    header: 'Preview',
    cell: ({ row }) => {
      const item = row.original
      if (item.type === 'image') {
        return (
          <div className="relative h-10 w-10 rounded-md overflow-hidden">
            <Image
              src={item.url}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        )
      } else if (item.type === 'video') {
        // You might want a video thumbnail or icon here
        return <span className="text-sm text-muted-foreground">Video</span>
      }
      return null
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
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return (
        <Badge variant="outline">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      )
    },
    filterFn: (row, columnId, value) => {
      return row.getValue(columnId) === value
    },
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
    filterFn: (row, columnId, value) => {
      const isActive = row.getValue(columnId)
      return value === 'true' ? isActive === true : isActive === false
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        actions={[
          {
            label: 'Edit',
            href: `/admin/gallery/${row.original.id}/edit`,
          },
          {
            label: 'Delete',
            onClick: () => {
              // Handle delete
            },
          },
        ]}
      />
    ),
  },
] 