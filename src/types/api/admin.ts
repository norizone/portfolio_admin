import { Work, User, Tool } from '@prisma/client'

/**
 * General
 */
export type ListBody = {
  page: number
  pageSize: number
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

export type CreateWorkBody = {
  order: number
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
  gitUrl?: string | null
  role: string
  singleImgMain: string
  singleImgSub: string
  singleImgSub2?: string | null
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
