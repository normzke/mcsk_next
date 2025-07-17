import { Metadata } from "next";
import { auth } from "@/auth";
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
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/auth/login");
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
        <Heading
          title="Edit Slide"
          description="Edit hero slide details"
        />
      </div>
      <Separator />
      <SlideForm initialData={slide} />
    </div>
  );
} 