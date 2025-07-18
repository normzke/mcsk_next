import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { SubscriberForm } from "../../_components/subscriber-form";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Edit Subscriber | MCSK Admin",
  description: "Edit newsletter subscriber details",
};

interface EditSubscriberPageProps {
  params: {
    id: string;
  };
}

export default async function EditSubscriberPage({
  params,
}: EditSubscriberPageProps) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/auth/login");
  }

  const subscriber = await prisma.newsletterSubscriber.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!subscriber) {
    redirect("/admin/newsletter-subscribers");
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading
          title="Edit Subscriber"
          description="Edit newsletter subscriber details"
        />
      </div>
      <Separator />
      <SubscriberForm initialData={subscriber} />
    </div>
  );
} 