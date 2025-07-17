import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const [slides, total] = await Promise.all([
      prisma.heroSlide.findMany({
        where: {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              subtitle: {
                contains: search,
              },
            },
          ],
          deletedAt: null,
        },
        orderBy: {
          order: "asc",
        },
        skip,
        take: limit,
      }),
      prisma.heroSlide.count({
        where: {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              subtitle: {
                contains: search,
              },
            },
          ],
          deletedAt: null,
        },
      }),
    ]);

    return NextResponse.json({
      data: slides,
      meta: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("[HERO_SLIDES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
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

    const slide = await prisma.heroSlide.create({
      data: {
        title,
        subtitle,
        description,
        image,
        buttonText,
        buttonLink,
        order: order || 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.error("[HERO_SLIDES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 