import { logout } from '@/hooks/api/admin.api'
// import { authLogout } from '@/hooks/api/auth'

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

export const axiosClient: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/admin`,
  withCredentials: true,
})

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (
    error: AxiosError<{
      error?: string
      message?: string
      statusCode?: number
    }>
  ) => {
    let message = ''
    switch (error?.response?.status) {
      case 401:
        message = '認証エラー'
        await logout()
        window.location.href = '/login'
        break
      case 403:
        message = error.response?.data?.message ?? 'アクセスが拒否されました'
        break
      case 500:
        message = 'サーバーエラーが発生しました'
        break
      default:
        message = error.response?.data?.message ?? ''
        break
    }
    console.log(error)
    return Promise.reject({
      ...error.response?.data,
      message,
    })
  }
)
