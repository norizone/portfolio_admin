import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { CreateWorkBody } from '@/types/api/front'
import { Tool, Work } from '@prisma/client'

export const useMutateCreateWork = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (work: CreateWorkBody): Promise<Work> => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/work/create`,
        work
      )
      return res.data
    },
    onSuccess: () => {
      console.log('ok')
      // queryClient.invalidateQueries('works-list');
    },
  })
}

export const useGetToolList = () => {
  return useQuery<Tool[]>({
    queryKey: ['get-tool-list'],
    queryFn: async (): Promise<Tool[]> => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tool/list`
      )
      return res.data
    },
  })
}
