'use client'

import { WorkForm } from '@/features/works/main/components/WorkForm'
import { useGetWork } from '@/hooks/api/admin.hooks'
import { ToolData } from '@/types/api/admin'
import { Work } from '@prisma/client'
import Image from 'next/image'

type Props = {
  SSRToolData?: ToolData[]
  SSRWorkData?: Work
  id: number
}

const widthRegex = /width:(\d+)/
const heightRegex = /height:(\d+)/

export const EditWork = (props: Props) => {
  const { SSRToolData, SSRWorkData, id } = props

  const { data } = useGetWork(id, SSRWorkData)

  const extractFromUrl = (url: string, regex: RegExp) => {
    if (!url) return 1
    const match = url.match(regex)
    if (match && match[1]) {
      return parseInt(match[1], 10)
    } else {
      return 1
    }
  }

  const defaultValues = {}

  return (
    <>
      <WorkForm SSRToolData={SSRToolData} formType={'edit'} />
      {data?.archiveImg && (
        <Image
          alt=""
          src={`${data.archiveImg}`}
          width={extractFromUrl(data.archiveImg, widthRegex)}
          height={extractFromUrl(data.archiveImg, heightRegex)}
        />
      )}
    </>
  )
}
