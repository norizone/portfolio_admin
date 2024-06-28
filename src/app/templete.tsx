'use client'

import { MainWrap } from '@/components/layouts/wrap/MainWrap'
import { useRouter } from 'next/router'
import { AuthWrap } from '@/components/layouts/wrap/AuthWrap'
import { routers } from '@/routers/routers'
import { usePathname } from 'next/navigation'

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const path = usePathname()
  //TODO: auth　gardでやる login状態ならMain 実ログインならAUth
  const Wrapper =
    path !== routers.LOGIN && path !== routers.SIGNUP ? MainWrap : AuthWrap

  return <Wrapper>{children}</Wrapper>
}
