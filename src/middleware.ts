import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routers } from './routers/routers'
import axios from 'axios'
import { ADMIN_API_URL } from './utils/const'

export const config = {
  matcher: ['/((?!login|signup|_next/static|_next/image|favicon.ico).*)'],
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const cookieToken = request.cookies.get('access_token')
  if (!cookieToken?.value)
    return NextResponse.redirect(`${request.nextUrl.origin}${routers.LOGIN}`)

  const getAuth = async () => {
    const cookie = request.cookies
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ')
    try {
      const res = await axios.get(`${ADMIN_API_URL}/auth`, {
        headers: { cookie },
      })
      return response
    } catch (error) {
      return NextResponse.redirect(`${request.nextUrl.origin}${routers.LOGIN}`)
    }
  }
  getAuth()
}
