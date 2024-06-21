import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { CreateWorkBody, LoginBody } from '@/types/api/front'
import { Tool, Work } from '@prisma/client'
import { getCrfToken } from './useGetToken'

/*
  login
*/
export const useMutateLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginBody): Promise<any> => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`,
        data,
        await getCrfToken()
      )
      return res.data
    },
  })
}

export const useMutationLogout = () => {
  return useMutation({
    mutationFn: async (): Promise<any> => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        await getCrfToken()
      )
    },
  })
}

/*
  user
*/

/*
  work
*/
export const useMutateCreateWork = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateWorkBody): Promise<Work> => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/work/create`,
        data,
        await getCrfToken()
      )
      return res.data
    },
    onSuccess: () => {
      console.log('ok')
      // queryClient.invalidateQueries('works-list');
    },
  })
}

/*
  tool
*/
export const useGetToolList = () => {
  return useQuery<Tool[]>({
    queryKey: ['get-tool-list'],
    queryFn: async (): Promise<Tool[]> => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tool`,
        await getCrfToken()
      )
      return res.data
    },
  })
}
