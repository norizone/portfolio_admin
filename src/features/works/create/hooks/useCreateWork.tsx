import { useMutateCreateWork } from '@/hooks/api/admin.hooks'
import { CreateWorkBody } from '@/types/api/admin'

type WorkFormValues = Omit<
  CreateWorkBody,
  'useTools' | 'archiveImg' | 'singleImgMain' | 'singleImgSub' | 'singleImgSub2'
> & {
  useTools: number[]
  archiveImg: File
  singleImgMain: File
  singleImgSub: File
  singleImgSub2?: File | null
}

export const useCreateWork = () => {
  const {
    mutate: mutateCreateWork,
    isPending: isLoadingWork,
    isError: isErrorWork,
  } = useMutateCreateWork()

  const onSubmitCreate = (data: WorkFormValues) => {
    const selectedTool = data.useTools
    const useTools = selectedTool.map((tool) => ({
      id: tool,
    }))
    const body = {
      ...data,
      useTools,
    }

    mutateCreateWork(body, {
      onSuccess: (res) => {},
      onError: (error) => {
        console.error(error)
      },
    })
  }

  return {
    onSubmitCreate,
    isLoadingWork,
    isErrorWork,
  }
}
