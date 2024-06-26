'use client'

import { WorkForm } from '@/app/works/_components/WorkForm'
import { useGetWork } from '@/hooks/api/admin.hooks'
import { ToolData } from '@/types/api/admin'
import { Work } from '@prisma/client'

type Props = {
  SSRToolData?: ToolData[]
  SSRWorkData?: Work
  id: number
}

export const EditWork = (props: Props) => {
  const { SSRToolData, SSRWorkData, id } = props

  const { data } = useGetWork(id, SSRWorkData)
  console.log(data)

  const defaultValues = {}

  return (
    <>
      <WorkForm SSRToolData={SSRToolData} formType={'edit'} />
      <img src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.archiveImg}`} />
    </>
  )
}
