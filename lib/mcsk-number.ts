import { prisma } from '@/lib/prisma'

/**
 * MCSK Number Generation Utility
 * 
 * Format: MCSK-YYYY-XXXXX
 * Where:
 * - MCSK: Fixed prefix
 * - YYYY: Year of registration
 * - XXXXX: Sequential number (5 digits, zero-padded)
 * 
 * Example: MCSK-2024-00001
 */

export async function generateMCSKNumber(): Promise<string> {
  const currentYear = new Date().getFullYear()
  
  // Find the highest membership number for the current year
  const latestMember = await prisma.member.findFirst({
    where: {
      membershipNumber: {
        startsWith: `MCSK-${currentYear}-`
      },
      deletedAt: null
    },
    orderBy: {
      membershipNumber: 'desc'
    },
    select: {
      membershipNumber: true
    }
  })

  let nextNumber = 1

  if (latestMember?.membershipNumber) {
    // Extract the number part and increment
    const numberPart = latestMember.membershipNumber.split('-')[2]
    nextNumber = parseInt(numberPart, 10) + 1
  }

  // Format: MCSK-YYYY-XXXXX (5 digits, zero-padded)
  const formattedNumber = nextNumber.toString().padStart(5, '0')
  return `MCSK-${currentYear}-${formattedNumber}`
}

/**
 * Validate MCSK number format
 */
export function validateMCSKNumber(membershipNumber: string): boolean {
  const pattern = /^MCSK-\d{4}-\d{5}$/
  return pattern.test(membershipNumber)
}

/**
 * Extract year from MCSK number
 */
export function extractYearFromMCSKNumber(membershipNumber: string): number | null {
  const match = membershipNumber.match(/^MCSK-(\d{4})-\d{5}$/)
  return match ? parseInt(match[1], 10) : null
}

/**
 * Extract sequential number from MCSK number
 */
export function extractSequentialNumber(membershipNumber: string): number | null {
  const match = membershipNumber.match(/^MCSK-\d{4}-(\d{5})$/)
  return match ? parseInt(match[1], 10) : null
}

/**
 * Get statistics for MCSK numbers
 */
export async function getMCSKNumberStats() {
  const currentYear = new Date().getFullYear()
  
  // Get total members for current year
  const currentYearMembers = await prisma.member.count({
    where: {
      membershipNumber: {
        startsWith: `MCSK-${currentYear}-`
      },
      deletedAt: null
    }
  })

  // Get total members across all years
  const totalMembers = await prisma.member.count({
    where: {
      membershipNumber: {
        not: null
      },
      deletedAt: null
    }
  })

  // Get year-wise breakdown
  const yearBreakdown = await prisma.member.groupBy({
    by: ['membershipNumber'],
    where: {
      membershipNumber: {
        not: null
      },
      deletedAt: null
    },
    _count: {
      membershipNumber: true
    }
  })

  const yearStats: { [key: string]: number } = {}
  yearBreakdown.forEach(item => {
    if (item.membershipNumber) {
      const year = extractYearFromMCSKNumber(item.membershipNumber)
      if (year) {
        yearStats[year] = (yearStats[year] || 0) + 1
      }
    }
  })

  return {
    currentYear,
    currentYearMembers,
    totalMembers,
    yearStats
  }
} 