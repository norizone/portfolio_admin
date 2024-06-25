import { cognitoError } from '@assets/constant/errorMessage'
import { useAuth } from '@lib/hooks/auth/useAuth'
import { apiInstance } from '@utils/axios'
import { ReactNode, useEffect } from 'react'

const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const { signOut, setCustomData } = useAuth()

  useEffect(() => {
    apiInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          signOut()
        }
        return Promise.reject(error?.response?.data || error)
      }
    )
  }, [])

  return <>{children}</>
}

export default AxiosProvider
