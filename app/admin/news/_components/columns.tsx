'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import type { News } from '@/types'
import { format } from 'date-fns'

export const columns: ColumnDef<News>[] = [
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
    accessorKey: 'slug',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
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
    accessorKey: 'isFeatured',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Featured" />
    ),
    cell: ({ row }) => {
      const isFeatured = row.getValue('isFeatured') as boolean
      return isFeatured ? (
        <Badge>Featured</Badge>
      ) : (
        <Badge variant="outline">No</Badge>
      )
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
        <Badge variant="success">Published</Badge>
      ) : (
        <Badge variant="secondary">Draft</Badge>
      )
    },
  },
  {
    accessorKey: 'publishedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Publish Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue('publishedAt') as string
      return format(new Date(date), "MMM d, yyyy")
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const news = row.original
      
      const deleteNews = async () => {
        try {
          const response = await fetch(`/api/admin/news/${news.id}`, {
            method: 'DELETE',
          })
          
          if (!response.ok) {
            throw new Error('Failed to delete news')
          }
          
          return Promise.resolve()
        } catch (error) {
          console.error('Error deleting news:', error)
          return Promise.reject(error)
        }
      }
      
      return (
        <DataTableRowActions
          row={row}
          actions={[
            {
              label: 'Edit',
              href: `/admin/news/${news.id}/edit`,
            },
            {
              label: 'View',
              href: `/admin/news/${news.id}`,
            },
          ]}
          onDelete={deleteNews}
          itemName={news.title}
          itemType="News Article"
        />
      )
    },
  },
] 