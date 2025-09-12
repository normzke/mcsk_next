import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/custom-auth'
import { prisma } from '@/lib/prisma'

// GET - Fetch site settings
export async function GET() {
  try {
    const session = await getSession()
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settings = await prisma.setting.findMany({
      where: {
        group: 'site'
      }
    })

    // Convert settings array to object
    const settingsObject: Record<string, string> = {}
    settings.forEach(setting => {
      settingsObject[setting.key] = setting.value
    })

    return NextResponse.json(settingsObject)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update site settings
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Update each setting
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') {
        await prisma.setting.upsert({
          where: { key },
          update: { value },
          create: {
            key,
            value,
            type: 'text',
            group: 'site'
          }
        })
      }
    }

    return NextResponse.json({ message: 'Settings updated successfully' })
  } catch (error) {
    console.error('Error updating site settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 