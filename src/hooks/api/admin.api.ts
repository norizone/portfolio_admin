import { axiosClient } from '@/utils/axios'
import { getCrfToken } from './useGetToken'
import { AuthData } from '@/types/api/admin'
import { authApiUrl } from '@/utils/apiUrl'

export const logout = async (): Promise<void> => {
  const res = await axiosClient.post(authApiUrl.logout(), undefined)
}

export const getAuth = async (): Promise<AuthData> => {
  const res = await axiosClient.get('/auth')
  return res.data
}
