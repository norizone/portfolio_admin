import { Work } from '@prisma/client'

export type WorkTool = {
  id: number
  toolName: string
}

export type CreateWorkBody = {
  order: number
  permission: number
  publication: number
  title: string
  titleEn: string
  archiveImg: string
  useTools: Array<WorkTool>
  comment?: string | null
  url?: string | null
  gitUrl?: string | null
  role: string
  singleImgMain: string
  singleImgSub: string
  singleImgSub2?: string | null
}

export type CreateToolBody = {
  toolName: string
}

export type CreateUserBody = {
  email: string
  password: string
  permission: number
}
