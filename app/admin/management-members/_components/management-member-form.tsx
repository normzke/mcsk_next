'use client';

import { useState } from 'react';
import { useForm, FormProvider, useFormContext, Controller, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

// Define form schema with proper types matching the Prisma model
const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  position: z.string().min(1, { message: 'Position is required.' }),
  role: z.string().min(1, { message: 'Role is required.' }),
  department: z.string().min(1, { message: 'Department is required.' }),
  profileImage: z.string().optional(),
  bio: z.string().optional(),
  order: z.number(), // required, not optional/nullable/default
  isActive: z.boolean(), // required, not optional/nullable/default
  status: z.enum(['active', 'inactive', 'on_leave']),
  startDate: z.union([z.string(), z.date()]).optional(),
  endDate: z.union([z.string(), z.date()]).optional(),
  linkedinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  phone: z.string().optional(),
  image: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

interface ManagementMemberFormProps {
  initialData?: {
    id?: string;
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
    status: "active" | "inactive" | "on_leave";
    phone?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    linkedinUrl?: string | null;
    twitterUrl?: string | null;
  } | null;
  onSuccess?: () => void;
}

// Add a type guard for Date
function isDate(val: unknown): val is Date {
  return val instanceof Date;
}

// Add a helper to normalize date values
function normalizeDate(val: unknown): string | undefined {
  if (typeof val === 'string') return val;
  if (val instanceof Date) return val.toISOString();
  return undefined;
}

export function ManagementMemberForm({ initialData, onSuccess }: ManagementMemberFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      name: initialData.name || '',
      firstName: initialData.firstName || '',
      lastName: initialData.lastName || '',
      email: initialData.email || '',
      position: initialData.position || '',
      role: initialData.role || '',
      department: initialData.department || '',
      status: (initialData.status as "active" | "inactive" | "on_leave") || 'active',
      isActive: typeof initialData.isActive === 'boolean' ? initialData.isActive : true,
      order: typeof initialData.order === 'number' ? initialData.order : 0,
      startDate: normalizeDate(initialData.startDate),
      endDate: normalizeDate(initialData.endDate),
      profileImage: initialData.profileImage || undefined,
      bio: initialData.bio || undefined,
    } : {
      name: '',
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      role: '',
      department: '',
      status: 'active',
      isActive: true,
      order: 0,
      startDate: undefined,
      endDate: undefined,
      profileImage: undefined,
      bio: undefined,
    },
  });

  const { handleSubmit, control, formState: { isSubmitting } } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const url = initialData?.id
        ? `/api/admin/management-members/${initialData.id}`
        : '/api/admin/management-members';
      
      const method = initialData?.id ? 'PUT' : 'POST';
      
      // No-op function for date change (if needed)
      const onDateChange = (date: Date | undefined) => {
        // No-op
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          startDate: normalizeDate(data.startDate),
          endDate: normalizeDate(data.endDate),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save management member');
      }

      toast({
        title: 'Success',
        description: initialData?.id 
          ? 'Management member updated successfully' 
          : 'Management member created successfully',
      });

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/admin/management-members');
        router.refresh();
      }
    } catch (error) {
      console.error('Error saving management member:', error);
      toast({
        title: 'Error',
        description: 'Failed to save management member. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="firstName"
            render={({ field }: { field: ControllerRenderProps<FormValues, "firstName"> }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="lastName"
            render={({ field }: { field: ControllerRenderProps<FormValues, "lastName"> }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="name"
          render={({ field }: { field: ControllerRenderProps<FormValues, "name"> }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }: { field: ControllerRenderProps<FormValues, "email"> }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="email@example.com" {...field} disabled={isLoading} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }: { field: ControllerRenderProps<FormValues, "phone"> }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+1234567890" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="position"
            render={({ field }: { field: ControllerRenderProps<FormValues, "position"> }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="CEO" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="department"
            render={({ field }: { field: ControllerRenderProps<FormValues, "department"> }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="Engineering" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="role"
            render={({ field }: { field: ControllerRenderProps<FormValues, "role"> }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="status"
            render={({ field }: { field: ControllerRenderProps<FormValues, "status"> }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on_leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="startDate"
            render={({ field }: { field: ControllerRenderProps<FormValues, "startDate"> }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="endDate"
            render={({ field }: { field: ControllerRenderProps<FormValues, "endDate"> }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date (Optional)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="bio"
          render={({ field }: { field: ControllerRenderProps<FormValues, "bio"> }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about this member"
                  className="resize-none"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="linkedinUrl"
            render={({ field }: { field: ControllerRenderProps<FormValues, "linkedinUrl"> }) => (
              <FormItem>
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/username"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="twitterUrl"
            render={({ field }: { field: ControllerRenderProps<FormValues, "twitterUrl"> }) => (
              <FormItem>
                <FormLabel>Twitter URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://twitter.com/username"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end space-x-4">
          <Button type="button" className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground" onClick={() => router.push('/admin/management-members')} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {initialData?.id ? 'Update' : 'Create'} Member
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
