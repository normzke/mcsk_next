import { Metadata } from "next";
import { getSession } from "@/lib/custom-auth";
import { redirect } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { SlideForm } from "../../_components/slide-form";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Edit Slide | MCSK Admin",
  description: "Edit hero slide details",
};

interface EditSlidePageProps {
  params: {
    id: string;
  };
}

export default async function EditSlidePage({
  params,
}: EditSlidePageProps) {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/admin-login");
  }

  const slide = await prisma.heroSlide.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!slide) {
    redirect("/admin/hero-slides");
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading>Edit Slide</Heading>
      </div>
      <p className="text-muted-foreground mb-4">Edit hero slide details</p>
      <Separator />
      <SlideForm initialData={slide} />
    </div>
  );
} 