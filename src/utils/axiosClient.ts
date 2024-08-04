'use client'
import { logout } from '@/hooks/api/admin.api'
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { baseURL } from './apiUrl'
import { routers } from '@/routers/routers'

export const axiosClient: AxiosInstance = axios.create({
  baseURL: baseURL,
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
    }>,
  ) => {
    let message = ''
    switch (error?.response?.status) {
      case 401:
        message = '認証エラー'
        await logout()
        if (typeof window !== 'undefined') {
          window.location.href = routers.LOGIN // ログインページのURL
        }
        break
      case 403:
        message = error.response?.data?.message ?? 'アクセスが拒否されました'
        break
      case 500:
        message = 'サーバーエラーが発生しました'
        break
      case 404:
        message =
          error.response?.data?.message ?? 'ページが見つかりませんでした'
      default:
        message = error.response?.data?.message ?? ''
        break
    }
    console.log(error)
    return Promise.reject({
      ...error.response?.data,
      message,
    })
  },
)
