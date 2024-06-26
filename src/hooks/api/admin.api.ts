import { axiosClient } from '@/utils/axios'
import { getCrfToken } from './useGetToken'
import axios from 'axios'

const ADMIN_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin`

export const logout = async (): Promise<any> => {
  const res = await axios.post(
    `${ADMIN_API_URL}/auth/logout`,
    undefined,
    await getCrfToken()
  )
}
