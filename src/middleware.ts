import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routers } from './routers/routers'
import { authApiUrl, baseURL } from './utils/apiUrl'

export const config = {
  matcher: ['/((?!login|signup|_next/static|_next/image|favicon.ico).*)'],
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const cookieToken = request.cookies.get('access_token')
  if (!cookieToken?.value)
    return NextResponse.redirect(`${request.nextUrl.origin}${routers.LOGIN}`)

  const getAuth = async () => {
    let resStatus = 0
    const cookie = request.cookies
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ')
    try {
      const res = await fetch(`${baseURL}${authApiUrl.default}`, {
        headers: { cookie },
      })
      resStatus = res.status
      if (res.status === 200) {
        return response
      }
      // else {
      //   return NextResponse.redirect(
      //     `${request.nextUrl.origin}${routers.LOGIN}`
      //   )
      // }
    } catch (error) {
      resStatus = 400
      // return NextResponse.redirect(`${request.nextUrl.origin}${routers.LOGIN}`)
    }
    if (resStatus !== 200)
      NextResponse.redirect(`${request.nextUrl.origin}${routers.LOGIN}`)
  }
  getAuth()
}
