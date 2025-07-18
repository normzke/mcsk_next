import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const career = await prisma.career.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!career) {
      return new NextResponse("Not found", { status: 404 })
    }

    return NextResponse.json(career)
  } catch (error) {
    console.error("[JOB_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const career = await prisma.career.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        department: body.department,
        location: body.location,
        type: body.type,
        experience: body.experience,
        description: body.description,
        responsibilities: body.responsibilities,
        requirements: body.requirements,
        benefits: body.benefits,
        deadline: body.deadline ? new Date(body.deadline) : undefined,
      },
    })

    return NextResponse.json(career)
  } catch (error) {
    console.error("[JOB_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    await prisma.career.delete({
      where: {
        id: params.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[JOB_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 