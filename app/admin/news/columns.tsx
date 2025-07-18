'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header"
import { DataTableRowActions } from "@/components/ui/data-table/row-actions"
import { format } from "date-fns"
import type { News } from '@/types'

export const columns: ColumnDef<News>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      return (
        <Badge variant="outline">
          {category.charAt(0).toUpperCase() + category.slice(1)}
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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
] 