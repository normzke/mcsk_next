"use client"

import { useQuery } from '@tanstack/react-query';
import { DataTable, Filter } from '@/components/ui/data-table';
import { columns, ManagementMember } from './_components/columns';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

// Define the filters for the DataTable
const filters: Filter[] = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'On Leave', value: 'on_leave' },
    ],
  },
  {
    key: 'department',
    label: 'Department',
    options: [
      { label: 'Executive', value: 'executive' },
      { label: 'Management', value: 'management' },
      { label: 'Operations', value: 'operations' },
    ],
  },
];

// Fetch management members from the API
async function fetchManagementMembers(): Promise<ManagementMember[]> {
  const response = await fetch('/api/admin/management-members');
  if (!response.ok) {
    throw new Error('Failed to fetch management members');
  }
  return response.json();
}

export default function ManagementMembersPage() {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useQuery<ManagementMember[]>({
    queryKey: ['management-members'],
    queryFn: fetchManagementMembers,
  });

  // Handle delete success
  const handleDeleteSuccess = () => {
    refetch();
    toast({
      title: 'Success',
      description: 'Member deleted successfully',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> Failed to load management members. Please try again later.</span>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Management Members</h1>
        </div>
        <Button asChild>
          <Link 
            href="/admin/management-members/new"
            className="w-full md:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Management Member
          </Link>
        </Button>
      </div>
      
      <div className="rounded-md border bg-card dark:bg-gray-900/70 dark:backdrop-blur-lg dark:border-gray-800 shadow-sm transition-all duration-200 hover:shadow-md">
        <DataTable 
          columns={columns} 
          data={data || []} 
          searchKey="name"
          filters={filters}
          onRowClick={(member: ManagementMember) => {
            router.push(`/admin/management-members/${member.id}`);
          }}
        />
      </div>
    </div>
  );
}