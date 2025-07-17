'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'

export type SEOMeta = {
  id: string
  path: string
  title: string
  description: string | null
  keywords: string | null
  ogImage: string | null
  ogTitle: string | null
  ogDescription: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export const columns: ColumnDef<SEOMeta>[] = [
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
    accessorKey: 'path',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Path" />
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const title = row.getValue('title') as string
      return <div className="max-w-[300px] truncate">{title}</div>
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const description = row.getValue('description') as string | null
      if (!description) return null
      return <div className="max-w-[300px] truncate">{description}</div>
    },
  },
  {
    accessorKey: 'keywords',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keywords" />
    ),
    cell: ({ row }) => {
      const keywords = row.getValue('keywords') as string | null
      if (!keywords) return null
      return <div className="max-w-[300px] truncate">{keywords}</div>
    },
  },
  {
    accessorKey: 'ogImage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="OG Image" />
    ),
    cell: ({ row }) => {
      const ogImage = row.getValue('ogImage') as string | null
      if (!ogImage) return null
      return (
        <div className="relative h-10 w-10">
          <img
            src={ogImage}
            alt="OG Image"
            className="rounded-md object-cover"
          />
        </div>
      )
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
            href: `/admin/seo/${row.original.id}/edit`,
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