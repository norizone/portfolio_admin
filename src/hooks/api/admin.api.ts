import { axiosClient } from '@/utils/axios'
import { getCrfToken } from './useGetToken'
import { AuthData } from '@/types/api/admin'

export const logout = async (): Promise<void> => {
  const res = await axiosClient.post(
    `/auth/logout`,
    undefined,
    await getCrfToken(),
  )
}

export const getAuth = async (): Promise<AuthData> => {
  const res = await axiosClient.get('/auth', await getCrfToken())
  return res.data
}
