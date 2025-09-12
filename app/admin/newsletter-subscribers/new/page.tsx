import { Metadata } from "next";
import { getSession } from "@/lib/custom-auth";
import { redirect } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { SubscriberForm } from "../_components/subscriber-form";

export const metadata: Metadata = {
  title: "Add Subscriber | MCSK Admin",
  description: "Add a new newsletter subscriber",
};

export default async function NewSubscriberPage() {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/admin-login");
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading
          title="Add Subscriber"
          description="Add a new newsletter subscriber"
        />
      </div>
      <Separator />
      <SubscriberForm />
    </div>
  );
} 