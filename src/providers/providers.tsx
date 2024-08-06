'use client'
import { AuthGuard } from './authGuard'
import { QueryProviders } from './queryProvider'

type Props = { children: React.ReactNode }

const Providers = ({ children }: Props) => {
  return (
    <QueryProviders>
      <AuthGuard>{children}</AuthGuard>
    </QueryProviders>
  )
}

export default Providers
