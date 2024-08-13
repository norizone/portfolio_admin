'use server'
import { routers } from '@/routers/routers'
import { notFound, redirect } from 'next/navigation'

export const fetchError = (state: Response['status']) => {
  switch (state) {
    case 401:
      redirect(routers.LOGIN)
      break
    case 400:
      notFound()
      break
    default:
      return
  }
}
