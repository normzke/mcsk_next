import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'

export async function getSession() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return null
    }

    const decoded = verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as any

    return {
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      }
    }
  } catch (error) {
    console.error('Session check error:', error)
    return null
  }
}

// Export auth function to replace NextAuth auth
export const auth = getSession 