'use client'
import { LoadingIcon } from '@/components/elements/icon/LodingIcon'
import { useGetAuth } from '@/hooks/api/admin.hooks'
import { useLogout } from '@/hooks/auth/useLogout'
import { routers } from '@/routers/routers'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const AuthGuard = (props: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  const isLoading = false
  // const { isLoading, isError } = useGetAuth(
  //   pathname !== routers.LOGIN && pathname !== routers.SIGNUP,
  //   true,
  // )

  // const {
  //   onLogout
  // } = useLogout({ onSuccessLogout: () => router.replace(routers.LOGIN) })

  // useEffect(() => {
  //   if (isLoading || !isError) return
  //   // onLogout()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isError, isLoading])

  // if (isError) return (<></>)

  return (
    isLoading ? <LoadingIcon /> : <>{props.children}</>

  )
}
