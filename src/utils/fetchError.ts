'use server'
import { routers } from '@/routers/routers'
import { notFound, redirect } from 'next/navigation'

export const fetchError = (state: Response['status']) => {
  switch (state) {
    case 401:
      redirect(routers.LOGIN)
    case 400:
      notFound()
    default:
      return
  }
}
