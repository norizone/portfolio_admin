import { axiosClient } from '@/utils/axios'
import { getCrfToken } from './useGetToken'
import axios from 'axios'

const ADMIN_API_URL = `/admin`

export const logout = async () => {
  const res = await axiosClient.post(
    `${ADMIN_API_URL}/auth/logout`,
    undefined,
    await getCrfToken()
  )
  return res
}
