import * as ReactHookForm from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import type { NewsletterSubscriber } from '@/types'

const { useForm } = ReactHookForm;

const formSchema = z.object({
  email: z.string().email(),
  isActive: z.boolean(),
});

type SubscriberFormValues = z.infer<typeof formSchema>;

interface SubscriberFormProps {
  initialData?: NewsletterSubscriber;
}

export function SubscriberForm({ initialData }: SubscriberFormProps) {
  const router = useRouter();
  const form = useForm<SubscriberFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: initialData?.email || '',
      isActive: initialData?.isActive ?? true,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: SubscriberFormValues) {
    try {
      if (initialData) {
        await fetch(`/api/admin/newsletter-subscribers/${initialData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        toast.success("Subscriber updated successfully");
      } else {
        await fetch("/api/admin/newsletter-subscribers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        toast.success("Subscriber added successfully");
      }
      router.push("/admin/newsletter-subscribers");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Active Status</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner className="mr-2 h-4 w-4" />}
          {initialData ? "Update Subscriber" : "Add Subscriber"}
        </Button>
      </form>
    </Form>
  );
} 