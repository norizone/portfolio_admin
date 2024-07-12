'use client'

import { MainWrap } from '@/components/layouts/wrap/MainWrap'
import { AuthWrap } from '@/components/layouts/wrap/AuthWrap'
import { routers } from '@/routers/routers'
import { usePathname } from 'next/navigation'

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const path = usePathname()
  const Wrapper =
    path !== routers.LOGIN && path !== routers.SIGNUP ? MainWrap : AuthWrap

  return <Wrapper>{children}</Wrapper>
}
