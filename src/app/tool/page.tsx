import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import type { Metadata } from 'next'
import { ToolClient } from '../../features/tool/root/components/ToolClient'

import { cookies } from 'next/headers'
import { ToolData } from '@/types/api/admin'
import { baseURL, toolApiUrl } from '@/utils/apiUrl'
import { notFound } from 'next/navigation'
import axios from 'axios'

export const metadata: Metadata = {
  title: 'ツール一覧',
}
const getToolList = async (): Promise<ToolData[]> => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await axios.get(`${baseURL}${toolApiUrl.all()}`, {
      headers: { cookie },
    })
    return res.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function Tool() {
  const data = await getToolList()
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        ツール一覧
      </PrimaryHeadline>
      <ToolClient SSRData={data} />
    </section>
  )
}
