import { Work, User, Tool } from '@prisma/client'

/**
 * General
 */
export type ListBody = {
  page: number
  pageSize: number
}

/**
 * auth
 */
export type AuthData = {
  id?: number
  email?: string
}

/**
 * login
 */
export type LoginBody = {
  email: string
  password: string
}

/**
 * Work
 */
export type WorkTool = {
  id: number
}

export type DetailWork = Omit<Work, 'createdAt' | 'updateAt' | 'order'> & {
  useTools: {
    id: number
  }[]
}

export type EditCreateWorkBody = {
  permission: number
  publication: number
  title: string
  titleEn: string
  archiveImg: string
  useTools: {
    id: number
  }[]
  comment?: string | null
  url?: string | null
  isLinkToUrl?: number | null
  gitUrl?: string | null
  role: string
  singleImgMain: string
  singleImgSub?: string | null
  singleImgSub2?: string | null
}

export type WorkList = Pick<Work, 'id' | 'title' | 'permission' | 'publication'>

export type WorkListRes = {
  items: WorkList[]
  totalPages: number
  totalCount: number
}

export type WorkListItemWithOrder = WorkList & Pick<Work, 'order'> 

export type UpdateOrderWork = Pick<Work, 'id' | 'order'>

/**
 * User
 */
export type UserData = Omit<User, 'hashedPassword'>

export type CreateUserBody = EditUserBody & {
  password: string
}

export type EditUserBody = {
  email: string
  permission: number
}

/**
 * Tool
 */
export type ToolData = Pick<Tool, 'id' | 'toolName' | 'order'>

export type CreateToolBody = Pick<ToolData, 'toolName'>

export type EditTool = Omit<ToolData, 'order'>

export type UpdateToolsBody = {
  tools: EditTool[]
}

export type UpdateOrderTool = Pick<Tool, 'id' | 'order'>

export type DeleteToolParams = Pick<ToolData, 'id'>

/**
 * Dashboard
 */
export type ResDashboardData = {
  workCount?: number
  userCount?: number
  toolCount?: number
}
