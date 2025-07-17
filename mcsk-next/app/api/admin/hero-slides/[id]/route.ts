import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const slide = await prisma.heroSlide.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.error("[HERO_SLIDE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, subtitle, description, image, buttonText, buttonLink, order, isActive } = body;

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!image) {
      return new NextResponse("Image is required", { status: 400 });
    }

    const slide = await prisma.heroSlide.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        subtitle,
        description,
        image,
        buttonText,
        buttonLink,
        order,
        isActive,
      },
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.error("[HERO_SLIDE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const slide = await prisma.heroSlide.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.error("[HERO_SLIDE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 