import { axiosClient } from '@/utils/axios'

export const getCrfToken = async () => {
  const { data } = await axiosClient.get(`/auth/csrf`)
  return { headers: { 'csrf-token': data.csrfToken } }
}
