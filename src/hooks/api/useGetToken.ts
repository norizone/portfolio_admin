import axios from 'axios'

export const getCrfToken = async () => {
  axios.defaults.withCredentials = true // cookieをサーバーとクライアントでやり取りする
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/csrf`
  )
  return { headers: { 'csrf-token': data.csrfToken } }
}
