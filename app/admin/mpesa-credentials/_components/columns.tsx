'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table/column-header'
import { DataTableRowActions } from '@/components/ui/data-table/row-actions'
import { Button } from '@/components/ui/button'
import { Edit, Eye, Shield, CreditCard } from 'lucide-react'
import Link from 'next/link'

export type MpesaCredentials = {
  id: string
  environment: string
  businessName: string
  shortcode: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<MpesaCredentials>[] = [
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
    accessorKey: 'environment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Environment" />
    ),
    cell: ({ row }) => {
      const environment = row.getValue('environment') as string
      const isProduction = environment === 'production'
      return (
        <div className="flex items-center">
          <Shield className={`mr-2 h-4 w-4 ${isProduction ? 'text-red-600' : 'text-yellow-600'}`} />
          <Badge variant={isProduction ? 'destructive' : 'secondary'}>
            {environment.charAt(0).toUpperCase() + environment.slice(1)}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'businessName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Business Name" />
    ),
    cell: ({ row }) => {
      const businessName = row.getValue('businessName') as string
      return <div className="font-medium">{businessName}</div>
    },
  },
  {
    accessorKey: 'shortcode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shortcode" />
    ),
    cell: ({ row }) => {
      const shortcode = row.getValue('shortcode') as string
      return (
        <div className="flex items-center">
          <CreditCard className="mr-2 h-4 w-4 text-green-600" />
          <span className="font-mono">{shortcode}</span>
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
    id: 'actions',
    cell: ({ row }) => {
      const credentials = row.original
      
      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <Link href={`/admin/mpesa-credentials/${credentials.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <Link href={`/admin/mpesa-credentials/${credentials.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <DataTableRowActions
            row={row}
            actions={[
              {
                label: 'View',
                href: `/admin/mpesa-credentials/${credentials.id}`,
              },
              {
                label: 'Edit',
                href: `/admin/mpesa-credentials/${credentials.id}/edit`,
              },
            ]}
          />
        </div>
      )
    },
  },
] 