import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routers } from './routers/routers'

export const config = {
  matcher: ['/((?!login|signup|_next/static|_next/image|favicon.ico).*)'],
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  let cookie = request.cookies.get('access_token')
  if (!cookie?.value) {
    console.log('token')
    console.log(cookie?.value)
    console.log('url')
    console.log(request.nextUrl)
    return NextResponse.redirect(`${request.nextUrl.origin}/login`)
  } else {
    return response
  }
}
