import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  AuthData,
  CreateToolBody,
  CreateWorkBody,
  EditUserBody,
  ListBody,
  LoginBody,
  ResDashboardData,
  ToolData,
  UpdateToolsBody,
  WorkListRes,
  uploadImageRes,
} from '@/types/api/admin'
import { Tool, User, Work } from '@prisma/client'
import { getCrfToken } from './useGetToken'
import { CreateUserBody, UserData } from '@/types/api/admin'
import { axiosClient } from '@/utils/axiosClient'
import { toolKeys, workKeys, userKeys, dashboard, auth } from './queryKey'
import {
  authApiUrl,
  dashboardApiUrl,
  toolApiUrl,
  userApiUrl,
  workApiUrl,
} from '@/utils/apiUrl'

export const useGetAuth = (enabled: boolean = true) => {
  return useQuery({
    queryKey: auth.all,
    queryFn: async (): Promise<AuthData> => {
      const res = await axiosClient.get('/auth')
      return res.data
    },
    enabled,
  })
}

/*
  signup/login
*/
export const useMutateSignUp = () => {
  return useMutation({
    mutationFn: async (data: LoginBody): Promise<AuthData> => {
      const res = await axiosClient.post(authApiUrl.signup(), data)
      return res.data
    },
  })
}

export const useMutateLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginBody): Promise<AuthData> => {
      const res = await axiosClient.post(authApiUrl.login(), data)
      return res.data
    },
  })
}

export const useMutationLogout = () => {
  return useMutation({
    mutationFn: async (): Promise<void> => {
      const res = await axiosClient.post(authApiUrl.logout(), undefined)
    },
  })
}

/*
  user
*/
export const useGetUserList = (SSRData?: UserData[]) => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: async (): Promise<UserData[]> => {
      const res = await axiosClient.get(userApiUrl.all())
      return res.data
    },
    initialData: SSRData,
  })
}

export const useMutateCreateUser = () => {
  return useMutation({
    mutationFn: async (data: CreateUserBody): Promise<string> => {
      const res = await axiosClient.post(userApiUrl.create(), data)
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
      const res = await axiosClient.patch(
        userApiUrl.edit(params.userId),
        params.body,
      )
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}

export const useMutateDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (userId: number): Promise<void> => {
      const res = await axiosClient.delete(userApiUrl.delete(userId))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}

/*
  work
*/
export const useGetWorkList = (ListBody: ListBody, SSRData?: WorkListRes) => {
  return useQuery<WorkListRes>({
    queryKey: workKeys.list(ListBody),
    queryFn: async (): Promise<WorkListRes> => {
      const res = await axiosClient.post(workApiUrl.list(), ListBody)
      return res.data
    },
    initialData: SSRData,
  })
}

export const useGetWork = (id: number, SSRData?: Work) => {
  return useQuery<Work>({
    queryKey: workKeys.detail(id),
    queryFn: async (): Promise<Work> => {
      const res = await axiosClient.get(workApiUrl.detail(id))
      return res.data
    },
    initialData: SSRData,
  })
}

export const useMutateUploadImages = () => {
  return useMutation({
    mutationFn: async (files: FormData): Promise<uploadImageRes> => {
      const res = await axiosClient.post(workApiUrl.uploadImages(), files, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return res.data
    },
  })
}

export const useMutateCreateWork = () => {
  return useMutation({
    mutationFn: async (data: CreateWorkBody | any): Promise<Work> => {
      const res = await axiosClient.post(workApiUrl.create(), data)
      return res.data
    },
  })
}

export const useMutateDeleteWork = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await axiosClient.delete(workApiUrl.delete(id))
      return res.data
    },
  })
}

/**
 * tool
 */
export const useGetToolList = (SSRData?: ToolData[]) => {
  return useQuery<ToolData[]>({
    queryKey: toolKeys.all,
    queryFn: async (): Promise<ToolData[]> => {
      const res = await axiosClient.get(toolApiUrl.all())
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
      const res = await axiosClient.delete(toolApiUrl.delete(id))
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: toolKeys.all })
    },
  })
}

// tool_create
export const useMutateCreateTool = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: CreateToolBody) => {
      const res = await axiosClient.post(toolApiUrl.create(), body)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: toolKeys.all })
    },
  })
}

// tools_update
export const useMutateUpdateTools = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: UpdateToolsBody) => {
      const res = await axiosClient.patch(toolApiUrl.edit(), body)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: toolKeys.all })
    },
  })
}

// dashboard
export const useGetDashBordData = () => {
  return useQuery({
    queryFn: async (): Promise<ResDashboardData> => {
      const res = await axiosClient.get(dashboardApiUrl.default)
      return res.data
    },
    queryKey: dashboard.all,
  })
}
