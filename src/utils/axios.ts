import { logout } from '@/hooks/api/admin.api'
import { authLogout } from '@/hooks/api/auth'
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

export const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    switch (error?.response?.status) {
      case 401:
        error.message = '認証エラー'
        // await logout()
        break
      case 403:
        error.message = 'アクセスが拒否されました'
        break
      case 500:
        error.message = 'サーバーエラー'
        break
      default:
        break
    }
    return Promise.reject(error.message)
  }
)
