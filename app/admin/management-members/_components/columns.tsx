'use client'

import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Table, Row } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown, Pencil, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

// Define proper types for StatusBadge component
type StatusBadgeProps = {
  status: string;
  isActive: boolean;
};

const StatusBadge = ({ status, isActive }: StatusBadgeProps) => {
  if (!isActive) {
    return <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground">Inactive</div>;
  }
  
  switch (status) {
    case 'active':
      return <div className="inline-flex items-center rounded-full border-transparent bg-primary text-primary-foreground px-2.5 py-0.5 text-xs font-semibold">Active</div>;
    case 'on_leave':
      return <div className="inline-flex items-center rounded-full border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">On Leave</div>;
    default:
      return <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground">{status}</div>;
  }
};

export type ManagementMember = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  role: string;
  department: string;
  profileImage?: string | null;
  image?: string | null;
  bio?: string | null;
  order: number;
  isActive: boolean;
  status: string;
  phone?: string | null;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export const columns: ColumnDef<ManagementMember>[] = [
  {
    id: 'select',
    header: ({ table }: { table: Table<ManagementMember> }) => (
      <div
        onClick={() => table.toggleAllPageRowsSelected(!table.getIsAllPageRowsSelected())}
      >
        <div>
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        </div>
      </div>
    ),
    cell: ({ row }: { row: { getIsSelected: () => boolean; toggleSelected: (value: boolean) => void } }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean | 'indeterminate') => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }: { row: Row<ManagementMember> }) => {
      const member = row.original;
      const imageUrl = member.profileImage || member.image || '';
      return (
        <div className="flex items-center gap-3">
          {imageUrl && (
            <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={imageUrl}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="min-w-0">
            <div className="font-medium truncate">{member.name}</div>
            <div className="text-sm text-muted-foreground truncate">{member.position}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }: { row: { getValue: (key: string) => unknown } }) => {
      const email = row.getValue('email') as string;
      return (
        <a 
          href={`mailto:${email}`} 
          className="text-blue-600 hover:underline truncate block max-w-[200px]"
          title={email}
        >
          {email}
        </a>
      );
    },
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }: { row: { getValue: (key: string) => unknown } }) => {
      const department = row.getValue('department') as string;
      return <div className="font-medium">{department}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: { getValue: (key: string) => unknown } }) => {
      const status = row.getValue('status') as string;
      const isActive = row.getValue('isActive') as boolean;
      
      return <StatusBadge status={status} isActive={isActive} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }: { column: { toggleSorting: (asc: boolean) => void; getIsSorted: () => 'asc' | 'desc' | false } }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground -ml-4 h-8 rounded-md gap-1.5 px-3"
        >
          {/* Use a hardcoded column name since we know this is the createdAt column */}
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }: { row: { getValue: (key: string) => unknown } }) => {
      const date = new Date(row.getValue('createdAt') as string);
      return <div className="text-sm">{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }: { row: Row<ManagementMember> }) => {
      const member = row.original;
      const router = useRouter();
      const { toast } = useToast();

      const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
          return;
        }

        try {
          const response = await fetch(`/api/admin/management-members/${member.id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to delete member');
          }

          toast({
            title: 'Success',
            description: 'Member deleted successfully',
          });

          // Refresh the page to update the table
          router.refresh();
        } catch (error) {
          console.error('Error deleting member:', error);
          toast({
            title: 'Error',
            description: 'Failed to delete member. Please try again.',
            variant: 'destructive',
          });
        }
      };

      return (
        <div className="flex items-center justify-end gap-2">
          <button
          onClick={() => row.toggleExpanded(!row.getIsExpanded())}
          title="View details"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4" />
        </button>
          <button
          onClick={() => router.push(`/admin/management-members/${member.id}/edit`)}
          title="Edit"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
        >
          <Pencil className="h-4 w-4" />
        </button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(member.id)}>
                Copy member ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/admin/management-members/${member.id}`)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => router.push(`/admin/management-members/${member.id}/edit`)}
                className="text-blue-600"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];