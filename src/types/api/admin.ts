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
  singleImgSub: string
  singleImgSub2?: string | null
}

export type WorkList = Pick<Work, 'id' | 'title' | 'order' | 'publication'>

export type WorkListRes = {
  items: WorkList[]
  totalPages: number
  totalCount: number
}

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
export type ToolData = Pick<Tool, 'id' | 'toolName'>

export type CreateToolBody = Pick<ToolData, 'toolName'>

export type UpdateToolsBody = {
  tools: ToolData[]
}

export type DeleteToolParams = Pick<ToolData, 'id'>

/**
 * Dashboard
 */
export type ResDashboardData = {
  workCount?: number
  userCount?: number
  toolCount?: number
}
