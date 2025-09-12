import { NextResponse } from 'next/server'
import { auth } from '@/lib/custom-auth'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return new NextResponse('No file provided', { status: 400 })
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return new NextResponse('File too large. Maximum size is 10MB.', { status: 400 })
    }

    // Determine file type and directory
    const fileType = file.type.split('/')[0] // image, application, etc.
    let uploadDir = 'files' // default
    
    if (fileType === 'image') {
      uploadDir = 'images'
    } else if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('text')) {
      uploadDir = 'documents'
    }

    // Create unique filename
    const fileExtension = file.name.split('.').pop()
    const uniqueFilename = `${randomUUID()}.${fileExtension}`
    
    // Ensure upload directory exists
    const uploadPath = join(process.cwd(), 'public', 'uploads', uploadDir)
    await mkdir(uploadPath, { recursive: true })

    // Save file to server
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = join(uploadPath, uniqueFilename)
    await writeFile(filePath, buffer)

    // Return the public URL
    const publicUrl = `/uploads/${uploadDir}/${uniqueFilename}`

    return NextResponse.json({
      success: true,
      file: publicUrl,
      filename: file.name,
      size: file.size,
      type: file.type
    })
  } catch (error) {
    console.error('[UPLOAD_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 