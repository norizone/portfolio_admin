import { axiosClient } from '@/utils/axios'
import { getCrfToken } from './useGetToken'

export const logout = async (): Promise<any> => {
  const res = await axiosClient.post(
    `/auth/logout`,
    undefined,
    await getCrfToken()
  )
}

export const getAuth = async (): Promise<any> => {
  const res = await axiosClient.get('/auth', await getCrfToken())
  return res.data
}
