import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get response
  const response = NextResponse.next()

  // Add CORS headers
  response.headers.append('Access-Control-Allow-Credentials', 'true')
  response.headers.append('Access-Control-Allow-Origin', '*') // In production, replace * with your domain
  response.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  response.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  return response
}

// Configure which paths should run the middleware
export const config = {
  matcher: '/api/:path*',
}
