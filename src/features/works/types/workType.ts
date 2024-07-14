import { EditCreateWorkBody } from '@/types/api/admin'

export type WorkFormValues = Omit<
  EditCreateWorkBody,
  'useTools' | 'permission' | 'publication'
> & {
  permission: string
  publication: string
  useTools: number[]
  uploadArchiveImg?: File | null
  uploadSingleImgMain?: File | null
  uploadSingleImgSub?: File | null
  uploadSingleImgSub2?: File | null
}
