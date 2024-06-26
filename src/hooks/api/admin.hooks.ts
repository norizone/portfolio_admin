import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  CreateToolBody,
  CreateWorkBody,
  EditUserBody,
  ListBody,
  LoginBody,
  ToolData,
  UpdateToolsBody,
  WorkListRes,
  uploadImageRes,
} from '@/types/api/admin'
import { Tool, User, Work } from '@prisma/client'
import { getCrfToken } from './useGetToken'
import { CreateUserBody, UserData } from '@/types/api/admin'
import { axiosClient } from '@/utils/axios'

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
        `${process.env.NEXT_PUBLIC_API_URL}${ADMIN_API_URL}/auth/login`,
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
export const useGetUserList = (SSRData?: UserData[]) => {
  return useQuery({
    queryKey: ['get-user-list'],
    queryFn: async (): Promise<UserData[]> => {
      const res = await axios.get(
        `${ADMIN_API_URL}/user/list`,
        await getCrfToken()
      )
      return res.data
    },
    initialData: SSRData,
  })
}

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

export const useMutateEditUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (params: {
      userId: number
      body: EditUserBody
    }): Promise<UserData> => {
      const res = await axios.patch(
        `${ADMIN_API_URL}/user/edit/${params.userId}`,
        params.body,
        await getCrfToken()
      )
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-user-list'] })
    },
  })
}

export const useMutateDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (userId: number): Promise<void> => {
      const res = await axios.delete(
        `${ADMIN_API_URL}/user/delete/${userId}`,
        await getCrfToken()
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-user-list'] })
    },
  })
}

/*
  work
*/

export const useGetWorkList = (ListBody: ListBody, SSRData?: WorkListRes) => {
  return useQuery<WorkListRes>({
    queryKey: ['get-work-list', ListBody],
    queryFn: async (): Promise<WorkListRes> => {
      const res = await axios.post(
        `${ADMIN_API_URL}/work/list`,
        ListBody,
        await getCrfToken()
      )
      return res.data
    },
    initialData: SSRData,
  })
}

export const useGetWork = (id: number, SSRData?: Work) => {
  return useQuery<Work>({
    queryKey: ['get-work', id],
    queryFn: async (): Promise<Work> => {
      const res = await axios.get(
        `${ADMIN_API_URL}/work/${id}`,
        await getCrfToken()
      )
      return res.data
    },
    initialData: SSRData,
  })
}

export const useMutateUploadImages = () => {
  return useMutation({
    mutationFn: async (files: FormData): Promise<uploadImageRes> => {
      const res = await axios.post(
        `${ADMIN_API_URL}/work/upload_images`,
        files,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(await getCrfToken()).headers,
          },
        }
      )
      return res.data
    },
  })
}

export const useMutateCreateWork = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateWorkBody | any): Promise<Work> => {
      const res = await axios.post(
        `${ADMIN_API_URL}/work/create`,
        data,
        await getCrfToken()
      )
      return res.data
    },
    onSuccess: () => {
      console.log('ok')
      queryClient.invalidateQueries({ queryKey: ['get-work-list'] })
    },
  })
}

/**
 * tool
 */
export const useGetToolList = (SSRData?: ToolData[]) => {
  return useQuery<ToolData[]>({
    queryKey: ['get-tool-list'],
    queryFn: async (): Promise<ToolData[]> => {
      const res = await axiosClient.get(
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
