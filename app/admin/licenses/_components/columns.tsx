'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'
import { format } from 'date-fns'
import type { License } from '@/types'

export const columns: ColumnDef<License>[] = [
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
    accessorKey: 'licenseNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="License Number" />
    ),
  },
  {
    accessorKey: 'member',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Member" />
    ),
    cell: ({ row }) => {
      const member = row.original.member
      return (
        <div className="flex flex-col">
          <span className="font-medium">{member?.name || '-'}</span>
          <span className="text-sm text-muted-foreground">
            {member?.email || '-'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'licenseType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="License Type" />
    ),
    cell: ({ row }) => {
      const licenseType = row.original.licenseType
      return (
        <div className="flex flex-col">
          <span className="font-medium">{licenseType?.title || '-'}</span>
          <span className="text-sm text-muted-foreground">
            {licenseType?.category || '-'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const color = {
        approved: 'success',
        pending: 'warning',
        rejected: 'destructive',
      }[status]

      return (
        <Badge variant={color as any}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'issuedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Issued" />
    ),
    cell: ({ row }) => {
      const date = row.original.issuedAt
      return date ? format(new Date(date), 'MMM d, yyyy') : '-'
    },
  },
  {
    accessorKey: 'expiresAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expires" />
    ),
    cell: ({ row }) => {
      const date = row.original.expiresAt
      return date ? format(new Date(date), 'MMM d, yyyy') : '-'
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
            href: `/admin/licenses/${row.original.id}/edit`,
          },
          {
            label: 'View',
            href: `/admin/licenses/${row.original.id}`,
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