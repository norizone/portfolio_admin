import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routers } from './routers/routers'
import axios from 'axios'
import { authApiUrl, baseURL } from './utils/apiUrl'

export const config = {
  matcher: ['/((?!login|signup|_next/static|_next/image|favicon.ico).*)'],
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const cookieToken = request.cookies.get('access_token')
  console.log('token', cookieToken?.value)
  if (!cookieToken?.value)
    return NextResponse.redirect(`${request.nextUrl.origin}${routers.LOGIN}`)

  const cookie = request.cookies
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  return response
  const getAuth = async () => {
    try {
      const res = await axios.get(`${baseURL}${authApiUrl.default}`, {
        headers: { cookie },
        withCredentials: true,
      })
      if (res.status === 200) {
        console.log('success')
        return response
      } else {
        console.log('error')
        return NextResponse.redirect(
          `${request.nextUrl.origin}${routers.LOGIN}`
        )
      }
    } catch (error) {
      return NextResponse.redirect(`${request.nextUrl.origin}${routers.LOGIN}`)
    }
  }
  getAuth()
}
