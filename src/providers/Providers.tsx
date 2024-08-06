'use client'
import { AuthGuard } from './AuthGuard'
import { QueryProviders } from './QueryProvider'

type Props = { children: React.ReactNode }

const Providers = ({ children }: Props) => {
  return (
    <QueryProviders>
      <AuthGuard>{children}</AuthGuard>
    </QueryProviders>
  )
}

export default Providers
