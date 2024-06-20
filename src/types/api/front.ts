import { Work } from '@prisma/client'

export type WorkTool = {
  id: number
  toolName: string
}

export type CreateWorkBody = Omit<Work, 'id' | 'createdAt' | 'updateAt'> & {
  useTools: WorkTool[]
}
