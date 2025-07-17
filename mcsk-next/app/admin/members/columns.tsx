'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header"
import { DataTableRowActions } from "@/components/ui/data-table/row-actions"
import Image from "next/image"
import { format } from "date-fns"

export type Member = {
  id: string
  membership_number: string
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
  id_number: string
  date_of_birth: string
  membership_category_id: string
  status: "active" | "inactive" | "suspended" | "pending"
  join_date: string
  profile_photo: string | null
  bio: string | null
  bank_name: string | null
  bank_account: string | null
  mpesa_number: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  category?: {
    id: string
    title: string
  }
}

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
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return `${row.getValue("first_name")} ${row.getValue("last_name")}`
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.getValue("category") as Member["category"]
      return category ? (
        <Badge variant="outline">{category.title}</Badge>
      ) : null
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as Member["status"]
      const variants = {
        active: "success",
        inactive: "secondary",
        suspended: "destructive",
        pending: "warning",
      }
      return (
        <Badge variant={variants[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "join_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Join Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("join_date") as string
      return format(new Date(date), "MMM d, yyyy")
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
] 