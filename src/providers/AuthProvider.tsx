import axios from 'axios'
import { cookies } from 'next/headers'
import { ADMIN_API_URL } from '@/utils/const'

const getAuthData = async (): Promise<any> => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await axios.get(`${ADMIN_API_URL}/auth`, {
      headers: { cookie },
    })
    return res.data
  } catch (error) {
    return ''
  }
}

export const AuthProvider = async (props: { children: React.ReactNode }) => {
  const authData = await getAuthData()

  return <>{props.children}</>
}
