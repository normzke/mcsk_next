import { NextRequest, NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ authenticated: false })
    }

    const decoded = verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as any

    return NextResponse.json({
      authenticated: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      }
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ authenticated: false })
  }
} 