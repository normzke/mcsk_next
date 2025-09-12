'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'
import { Button } from '@/components/ui/button'
import { ExternalLink, Edit, Eye } from 'lucide-react'
import Link from 'next/link'

export type SocialMedia = {
  id: string
  platform: string
  handle: string
  url: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<SocialMedia>[] = [
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
    accessorKey: 'platform',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Platform" />
    ),
    cell: ({ row }) => {
      const platform = row.getValue('platform') as string
      const platformColors = {
        twitter: 'bg-blue-400',
        facebook: 'bg-blue-600',
        instagram: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
        linkedin: 'bg-blue-700',
        youtube: 'bg-red-600',
      }
      
      return (
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full ${platformColors[platform as keyof typeof platformColors] || 'bg-gray-500'} flex items-center justify-center mr-2`}>
            <span className="text-white text-xs font-bold">
              {platform.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="capitalize">{platform}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'handle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Handle" />
    ),
    cell: ({ row }) => {
      const handle = row.getValue('handle') as string
      return <div className="font-mono">{handle}</div>
    },
  },
  {
    accessorKey: 'url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="URL" />
    ),
    cell: ({ row }) => {
      const url = row.getValue('url') as string
      return (
        <div className="flex items-center space-x-2">
          <span className="truncate max-w-[200px]">{url}</span>
          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
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
      const socialMedia = row.original
      
      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <Link href={`/admin/social-media/${socialMedia.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <Link href={`/admin/social-media/${socialMedia.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <DataTableRowActions
            row={row}
            actions={[
              {
                label: 'View',
                href: `/admin/social-media/${socialMedia.id}`,
              },
              {
                label: 'Edit',
                href: `/admin/social-media/${socialMedia.id}/edit`,
              },
            ]}
          />
        </div>
      )
    },
  },
] 