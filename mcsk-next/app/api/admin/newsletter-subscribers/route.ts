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

    const [subscribers, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        where: {
          email: {
            contains: search,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.newsletterSubscriber.count({
        where: {
          email: {
            contains: search,
          },
        },
      }),
    ]);

    return NextResponse.json({
      data: subscribers,
      meta: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("[NEWSLETTER_SUBSCRIBERS_GET]", error);
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
    const { email } = body;

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return new NextResponse("Email already subscribed", { status: 400 });
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
      },
    });

    return NextResponse.json(subscriber);
  } catch (error) {
    console.error("[NEWSLETTER_SUBSCRIBERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 