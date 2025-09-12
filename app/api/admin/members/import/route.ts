import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { generateMCSKNumber } from '@/lib/mcsk-number'
import * as XLSX from 'xlsx'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await auth()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      return NextResponse.json(
        { error: 'Please upload an Excel file (.xlsx or .xls)' },
        { status: 400 }
      )
    }

    // Read the file
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(worksheet)

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'No data found in the Excel file' },
        { status: 400 }
      )
    }

    const results = {
      total: data.length,
      imported: 0,
      skipped: 0,
      errors: [] as string[]
    }

    // Process each row
    for (let i = 0; i < data.length; i++) {
      const row = data[i] as any
      
      try {
        // Validate required fields
        if (!row.name || !row.email) {
          results.skipped++
          results.errors.push(`Row ${i + 2}: Missing required fields (name or email)`)
          continue
        }

        // Check if member already exists
        const existingMember = await prisma.member.findFirst({
          where: {
            email: row.email,
            deletedAt: null
          }
        })

        if (existingMember) {
          results.skipped++
          results.errors.push(`Row ${i + 2}: Member with email ${row.email} already exists`)
          continue
        }

        // Generate MCSK number if not provided
        let membershipNumber = row.membershipNumber
        if (!membershipNumber) {
          membershipNumber = await generateMCSKNumber()
        }

        // Create member
        const member = await prisma.member.create({
          data: {
            id: crypto.randomUUID(),
            name: row.name,
            email: row.email,
            phone: row.phone || null,
            address: row.address || null,
            city: row.city || null,
            country: row.country || 'Kenya',
            idNumber: row.idNumber || null,
            membershipType: row.membershipType || 'composer',
            status: row.status || 'active',
            membershipNumber,
            approvedAt: row.status === 'active' ? new Date() : null,
            approvedBy: row.status === 'active' ? (user?.user?.email || 'admin') : null,

            bio: row.bio || null,
            bankName: row.bankName || null,
            bankAccount: row.bankAccount || null,
            mpesaNumber: row.mpesaNumber || null,
            dateOfBirth: row.dateOfBirth ? new Date(row.dateOfBirth) : null,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        })

        // Create notification if member is active
        if (row.status === 'active') {
          await prisma.notification.create({
            data: {
              id: crypto.randomUUID(),
              memberId: member.id,
              type: 'membership_approved',
              title: 'Welcome to MCSK!',
              message: `Congratulations ${member.name}! Your MCSK membership has been approved. Your membership number is ${membershipNumber}. You can now access all member benefits and services.`,
              isRead: false,
              createdAt: new Date(),
            },
          })
        }

        results.imported++

      } catch (error) {
        results.skipped++
        results.errors.push(`Row ${i + 2}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Import completed. ${results.imported} members imported, ${results.skipped} skipped.`,
      results
    })

  } catch (error) {
    console.error('Error importing members:', error)
    return NextResponse.json(
      { error: 'Failed to import members' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await auth()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Return sample Excel template structure
    return NextResponse.json({
      success: true,
      template: {
        headers: [
          'name',
          'email',
          'phone',
          'address',
          'city',
          'country',
          'idNumber',
          'membershipType',
          'status',
          'membershipNumber',
          'bio',
          'bankName',
          'bankAccount',
          'mpesaNumber',
          'dateOfBirth'
        ],
        required: ['name', 'email'],
        optional: [
          'phone',
          'address',
          'city',
          'country',
          'idNumber',
          'membershipType',
          'status',
          'membershipNumber',
          'bio',
          'bankName',
          'bankAccount',
          'mpesaNumber',
          'dateOfBirth'
        ],
        sample: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+254700000000',
          address: '123 Main Street',
          city: 'Nairobi',
          country: 'Kenya',
          idNumber: '12345678',
          membershipType: 'composer',
          status: 'active',
          membershipNumber: 'MCSK-2024-00001',
          bio: 'Professional musician',
          bankName: 'Equity Bank',
          bankAccount: '1234567890',
          mpesaNumber: '+254700000000',
          dateOfBirth: '1990-01-01'
        }
      }
    })

  } catch (error) {
    console.error('Error getting import template:', error)
    return NextResponse.json(
      { error: 'Failed to get import template' },
      { status: 500 }
    )
  }
} 