'use client'

import { ColumnDef, Table, Row, Column } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header"
import { DataTableRowActions } from "@/components/ui/data-table/row-actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// import your own type from '@/types' if needed

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }: { table: Table<any> }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }: { row: Row<any> }) => (
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
    accessorKey: "name",
    header: ({ column }: { column: Column<any, unknown> }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }: { row: Row<any> }) => {
      const name = row.original.name;
      const image = row.original.image;

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={image || undefined} alt={name} />
            <AvatarFallback>{name ? name[0] : ''}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
            <span className="text-sm text-muted-foreground">{row.original.position}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "position",
    header: ({ column }: { column: Column<any, unknown> }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
  },

  {
    accessorKey: "isActive",
    header: ({ column }: { column: Column<any, unknown> }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }: { row: Row<any> }) => {
      const isActive = row.original.isActive
      return (
        <Badge className={isActive ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      )
    },
    filterFn: (row: Row<any>, id: string, value: string[]) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<any> }) => <DataTableRowActions row={row} />,
  },
]