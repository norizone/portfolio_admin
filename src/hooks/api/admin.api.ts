import { axiosClient } from '@/utils/axiosClient'
import { authApiUrl } from '@/utils/apiUrl'

export const logout = async (): Promise<void> => {
  const res = await axiosClient.post(authApiUrl.logout(), undefined)
}
