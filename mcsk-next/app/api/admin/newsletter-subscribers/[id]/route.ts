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

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(subscriber);
  } catch (error) {
    console.error("[NEWSLETTER_SUBSCRIBER_GET]", error);
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
    const { email, isActive } = body;

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: {
        email,
        NOT: {
          id: params.id,
        },
      },
    });

    if (existingSubscriber) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const subscriber = await prisma.newsletterSubscriber.update({
      where: {
        id: params.id,
      },
      data: {
        email,
        isActive,
      },
    });

    return NextResponse.json(subscriber);
  } catch (error) {
    console.error("[NEWSLETTER_SUBSCRIBER_PATCH]", error);
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

    const subscriber = await prisma.newsletterSubscriber.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(subscriber);
  } catch (error) {
    console.error("[NEWSLETTER_SUBSCRIBER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 