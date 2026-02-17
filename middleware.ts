
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  // Check if user is trying to access HomePage (or sub-paths) and is not authenticated
  if (request.nextUrl.pathname.startsWith('/HomePage') && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: '/HomePage/:path*',
}
    