'use client'
import { LoadingIcon } from '@/components/elements/icon/LodingIcon'
import { useGetAuth } from '@/hooks/api/admin.hooks'
import { routers } from '@/routers/routers'
import { usePathname } from 'next/navigation'

export const AuthGuard = (props: { children: React.ReactNode }) => {
  // const pathname = usePathname()
  // const { data, isLoading } = useGetAuth(
  //   pathname !== routers.LOGIN && pathname !== routers.SIGNUP
  // )
  // return isLoading ? <LoadingIcon /> : <>{props.children}</>
  return <>{props.children}</>
}
