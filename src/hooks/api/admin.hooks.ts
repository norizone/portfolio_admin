import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import {
  CreateToolBody,
  CreateWorkBody,
  ListBody,
  LoginBody,
  ToolData,
  UpdateToolsBody,
} from '@/types/api/admin'
import { Tool, User, Work } from '@prisma/client'
import { getCrfToken } from './useGetToken'
import { CreateUserBody, GetUser } from '@/types/api/admin'

const ADMIN_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin`
/*
  signup/login
*/
export const useMutateSignUp = () => {
  return useMutation({
    mutationFn: async (data: LoginBody): Promise<any> => {
      const res = await axios.post(
        `${ADMIN_API_URL}/auth/signup`,
        data,
        await getCrfToken()
      )
      return res.data
    },
  })
}

export const useMutateLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginBody): Promise<any> => {
      const res = await axios.post(
        `${ADMIN_API_URL}/auth/login`,
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
        `${ADMIN_API_URL}/auth/logout`,
        undefined,
        await getCrfToken()
      )
    },
  })
}

/*
  user
*/

export const useGetUserList = () => {}

export const useMutateCreateUser = () => {
  return useMutation({
    mutationFn: async (data: CreateUserBody): Promise<string> => {
      const res = await axios.post(
        `${ADMIN_API_URL}/user/create`,
        data,
        await getCrfToken()
      )
      return res.data
    },
  })
}

export const useMutateEditUser = () => {}

/*
  work
*/

export const useGetWorkList = (ListBody: ListBody) => {
  return useQuery<Work[]>({
    queryKey: ['get-work-list', ListBody],
    queryFn: async (): Promise<Work[]> => {
      const res = await axios.post(
        `${ADMIN_API_URL}/work/list`,
        ListBody,
        await getCrfToken()
      )
      return res.data
    },
  })
}

export const useMutateCreateWork = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateWorkBody): Promise<Work> => {
      const res = await axios.post(
        `${ADMIN_API_URL}/work/create`,
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

// tool_list
export const useGetToolList = (SSRData?: ToolData[]) => {
  return useQuery<ToolData[]>({
    queryKey: ['get-tool-list'],
    queryFn: async (): Promise<ToolData[]> => {
      const res = await axios.get(
        `${ADMIN_API_URL}/tool/list`,
        await getCrfToken()
      )
      return res.data
    },
    initialData: SSRData,
  })
}

// tool_delete
export const useMutateDeleteTool = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await axios.delete(
        `${ADMIN_API_URL}/tool/delete/${id}`,
        await getCrfToken()
      )
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-tool-list'] })
    },
  })
}

// tool_create
export const useMutateCreateTool = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: CreateToolBody) => {
      const res = await axios.post(
        `${ADMIN_API_URL}/tool/create`,
        body,
        await getCrfToken()
      )
      return res.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-tool-list'] })
    },
  })
}

// tools_update
export const useMutateUpdateTools = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: UpdateToolsBody) => {
      const res = await axios.patch(
        `${ADMIN_API_URL}/tool/edit`,
        body,
        await getCrfToken()
      )
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-tool-list'] })
    },
  })
}
