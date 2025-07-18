'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'
import { formatDistanceToNow } from 'date-fns'
import type { Contact } from '@/types'

export const columns: ColumnDef<Contact>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
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
    cell: ({ row }) => {
      const phone = row.getValue('phone') as string | null
      if (!phone) return null
      return phone
    },
  },
  {
    accessorKey: 'subject',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
  },
  {
    accessorKey: 'message',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Message" />
    ),
    cell: ({ row }) => {
      const message = row.getValue('message') as string
      return <div className="max-w-[300px] truncate">{message}</div>
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Received" />
    ),
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date
      return formatDistanceToNow(new Date(date), { addSuffix: true })
    },
  },
  {
    accessorKey: 'isRead',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isRead = row.getValue('isRead') as boolean
      return (
        <Badge variant={isRead ? 'secondary' : 'default'}>
          {isRead ? 'Read' : 'Unread'}
        </Badge>
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
            label: 'View',
            href: `/admin/contacts/${row.original.id}`,
          },
          {
            label: row.original.isRead ? 'Mark as Unread' : 'Mark as Read',
            onClick: () => {
              // Handle read/unread toggle
            },
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