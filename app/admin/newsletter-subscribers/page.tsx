import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./_components/columns";
import prisma from "@/lib/prisma";
import type { NewsletterSubscriber } from "@/types";

export const metadata: Metadata = {
  title: "Newsletter Subscribers | MCSK Admin",
  description: "Manage newsletter subscribers",
};

export default async function NewsletterSubscribersPage() {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/auth/login");
  }

  let subscribers: NewsletterSubscriber[] = [];
  try {
    subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    subscribers = [];
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading
          title="Newsletter Subscribers"
          description="Manage newsletter subscribers"
        />
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={subscribers}
        searchKey="email"
        newRowLink="/admin/newsletter-subscribers/new"
      />
    </div>
  );
} 