'use client'

import { useState } from 'react'
import { Row } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog"
import Link from "next/link"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  actions?: Array<{
    label: string
    href?: string
    onClick?: () => void
  }>
  onDelete?: (row: TData) => Promise<void>
  itemName?: string
  itemType?: string
}

export function DataTableRowActions<TData>({
  row,
  actions = [],
  onDelete,
  itemName = 'this item',
  itemType = 'item',
}: DataTableRowActionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {actions.map((action, index) => (
            action.href ? (
              <DropdownMenuItem key={index} asChild>
                <Link href={action.href}>
                  {action.label === 'Edit' && <Pencil className="mr-2 h-4 w-4" />}
                  {action.label === 'View' && <Eye className="mr-2 h-4 w-4" />}
                  {action.label}
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem key={index} onClick={action.onClick}>
                {action.label}
              </DropdownMenuItem>
            )
          ))}
          
          {onDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {onDelete && showDeleteDialog && (
        <DeleteConfirmDialog
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={() => onDelete(row.original)}
          title={`Delete ${itemType}`}
          description={`Are you sure you want to delete this ${itemType.toLowerCase()}?`}
          itemName={itemName}
        />
      )}
    </>
  )
}