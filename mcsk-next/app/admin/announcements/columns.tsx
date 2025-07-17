'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header"
import { DataTableRowActions } from "@/components/ui/data-table/row-actions"
import { format } from "date-fns"

export type Announcement = {
  id: string
  title: string
  content: string
  type: "info" | "warning" | "success" | "danger"
  image: string | null
  publish_at: string
  expire_at: string | null
  is_featured: boolean
  is_published: boolean
  button_text: string | null
  button_url: string | null
  attachment: string | null
  created_at: string
  updated_at: string
}

const variants: Record<Announcement['type'], "default" | "warning" | "success" | "destructive"> = {
  info: "default",
  warning: "warning",
  success: "success",
  danger: "destructive",
} as const

export const columns: ColumnDef<Announcement>[] = [
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
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("type") as Announcement['type']
      return (
        <Badge variant={variants[type]}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "is_published",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isPublished = row.getValue("is_published") as boolean
      return isPublished ? (
        <Badge variant="success">Published</Badge>
      ) : (
        <Badge variant="secondary">Draft</Badge>
      )
    },
  },
  {
    accessorKey: "publish_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Publish Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("publish_at") as string
      return format(new Date(date), "MMM d, yyyy")
    },
  },
  {
    accessorKey: "expire_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiry Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("expire_at") as string | null
      return date ? format(new Date(date), "MMM d, yyyy") : "No expiry date"
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
] 