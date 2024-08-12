import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import type { Metadata } from 'next'
import { LoginForm } from '@/features/login/components/LoginForm'
import { cookies } from 'next/headers'
import { authApiUrl, baseURL } from '@/utils/apiUrl'
import { redirect } from 'next/navigation'
import { routers } from '@/routers/routers'

export const metadata: Metadata = {
  title: 'ログイン',
}

const getAuth = async () => {
  const cookieToken = cookies().get('access_token')

  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')

  let resStatus = 0
  if (!cookieToken || !cookieToken.value) return
  try {
    const res = await fetch(`${baseURL}${authApiUrl.default}`, {
      headers: { cookie },
      cache: "no-store"
    })
    if (res.status === 200) {
      resStatus = res.status
    } else {
      await fetch(`${baseURL}${authApiUrl.logout}`, {
        headers: { cookie },
        cache: "no-store"
      })
    }
  } catch (error) {
    return
  }
  resStatus === 200 && redirect(routers.DASHBOARD)
}

export default async function AdminSetting() {
  await getAuth()
  return (
    <section className="max-w-[420px] w-full p-[2em] text-center mx-auto h-full flex-center">
      <div className="bg-white w-full p-[2em] text-center mx-auto">
        <PrimaryHeadline lang="en" tag="h1">
          login
        </PrimaryHeadline>
        <LoginForm />
      </div>
    </section>
  )
}
