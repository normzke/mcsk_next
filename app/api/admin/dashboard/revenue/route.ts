import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Bypass authentication in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[DEV] Authentication bypassed for revenue API')
    } else {
      // Check authentication in production
      const session = await auth()
      if (!session || session.user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }

    // Get current year
    const currentYear = new Date().getFullYear()
    
    // Get all licenses for the current year with their fees
    const licenses = await prisma.license.findMany({
      where: {
        createdAt: {
          gte: new Date(`${currentYear}-01-01`),
          lte: new Date(`${currentYear}-12-31`),
        },
        deletedAt: null,
      },
      include: {
        licenseType: true,  // Include the license type to get the fees
      },
    })

    // Initialize monthly revenue data
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    
    const monthlyRevenue = months.map((name, index) => ({
      name,
      total: 0,
    }))

    // Calculate revenue for each month
    licenses.forEach((license: any) => {
      const month = license.createdAt.getMonth()
      // Extract fee from the licenseType.fees (which is stored as JSON)
      const fees = license.licenseType?.fees as any[] || []
      const fee = fees.length > 0 ? Number(fees[0]?.amount || 0) : 0
      monthlyRevenue[month].total += fee
    })

    return NextResponse.json({ data: monthlyRevenue })
  } catch (error) {
    console.error('Error fetching revenue data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch revenue data' },
      { status: 500 }
    )
  }
}
