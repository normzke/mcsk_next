'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header"
import { DataTableRowActions } from "@/components/ui/data-table/row-actions"
import Image from "next/image"
import { format } from "date-fns"
import type { Member } from '@/types'

export const columns: ColumnDef<Member>[] = [
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
    accessorKey: "profile_photo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Photo" />
    ),
    cell: ({ row }) => {
      const photo = row.getValue("profile_photo") as string | null
      return photo ? (
        <div className="relative h-10 w-10">
          <Image
            src={photo}
            alt={`${row.getValue("first_name")} ${row.getValue("last_name")}`}
            fill
            className="rounded-full object-cover"
          />
        </div>
      ) : null
    },
  },
  {
    accessorKey: "membership_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Member No." />
    ),
  },
  {
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return row.getValue('name')
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.getValue('category') as Member['category']
      return category ? (
        <Badge variant="outline">{category.title}</Badge>
      ) : null
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as Member['status']

      if (!status) {
        return <Badge variant="default">Unknown</Badge>
      }

      const variants: { [key: string]: 'success' | 'secondary' | 'destructive' | 'warning' | 'default' } = {
        active: 'success',
        inactive: 'secondary',
        suspended: 'destructive',
        pending: 'warning',
      }

      const variant = variants[status] || 'default';

      return (
        <Badge variant={variant}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'joinDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Join Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue('joinDate') as string
      return format(new Date(date), 'MMM d, yyyy')
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
] 