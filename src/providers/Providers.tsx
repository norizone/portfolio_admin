import { AuthProvider } from './AuthProvider'
import { QueryProviders } from './QueryProvider'

type Props = { children: React.ReactNode }

const Providers = ({ children }: Props) => {
  return (
    <AuthProvider>
      <QueryProviders>{children}</QueryProviders>
    </AuthProvider>
  )
}

export default Providers
