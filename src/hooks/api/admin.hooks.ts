import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  AuthData,
  CreateToolBody,
  DetailWork,
  EditCreateWorkBody,
  EditUserBody,
  ListBody,
  LoginBody,
  ResDashboardData,
  ToolData,
  UpdateOrderTool,
  UpdateToolsBody,
  WorkListRes,
} from '@/types/api/admin'
import { Tool, User, Work } from '@prisma/client'
import { CreateUserBody, UserData } from '@/types/api/admin'
import { axiosClient } from '@/utils/axiosClient'
import {
  toolKeys,
  workKeys,
  userKeys,
  authKeys,
  dashboardKeys,
} from './queryKey'
import {
  authApiUrl,
  dashboardApiUrl,
  toolApiUrl,
  userApiUrl,
  workApiUrl,
} from '@/utils/apiUrl'

export const useGetAuth = (
  enabled: boolean = true,
  refetchOnWindowFocus?: boolean
) => {
  return useQuery({
    queryKey: authKeys.default,
    queryFn: async (): Promise<AuthData> => {
      const res = await axiosClient.get('/auth')
      return res.data
    },
    enabled,
    refetchOnWindowFocus,
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (): Promise<void> => {
      const res = await axiosClient.post(authApiUrl.logout(), undefined)
    },
    onSuccess: () => {
      queryClient.clear()
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
        params.body
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

export const useGetWork = (id: number, SSRData?: DetailWork) => {
  return useQuery<DetailWork>({
    queryKey: workKeys.detail(id),
    queryFn: async (): Promise<DetailWork> => {
      const res = await axiosClient.get(workApiUrl.detail(id))
      return res.data
    },
    initialData: SSRData,
  })
}

export const useMutateUploadImage = () => {
  return useMutation({
    mutationFn: async (files: FormData): Promise<string> => {
      const res = await axiosClient.post(workApiUrl.uploadImage(), files, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return res.data
    },
  })
}

export const useMutateDeleteImage = () => {
  return useMutation({
    mutationFn: async (data: { fileName: string }): Promise<Work> => {
      const res = await axiosClient.post(workApiUrl.deleteImage(), data)
      return res.data
    },
  })
}

export const useMutateEditImage = () => {
  return useMutation({
    mutationFn: async (files: FormData): Promise<string> => {
      const res = await axiosClient.post(workApiUrl.editImage(), files, {
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
    mutationFn: async (data: EditCreateWorkBody): Promise<Work> => {
      const res = await axiosClient.post(workApiUrl.create(), data)
      return res.data
    },
  })
}

export const useMutateEditWork = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: EditCreateWorkBody): Promise<Work> => {
      const res = await axiosClient.patch(workApiUrl.edit(id), data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workKeys.detail(id) })
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

// tools_order_update
export const useMutateUpdateOrderTool = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: UpdateOrderTool) => {
      const res = await axiosClient.patch(toolApiUrl.editOrder(), body)
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
    queryKey: dashboardKeys.default,
  })
}
