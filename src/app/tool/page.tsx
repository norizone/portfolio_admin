import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import type { Metadata } from 'next'
import { ToolClient } from './_components/ToolClient'
import axios from 'axios'
import { cookies } from 'next/headers'
import { ADMIN_API_URL } from '@/utils/const'
import { ToolData } from '@/types/api/admin'

export const metadata: Metadata = {
  title: 'ツール一覧',
}
const getToolList = async (): Promise<ToolData[]> => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await axios.get(`${ADMIN_API_URL}/tool/list`, {
      headers: { cookie },
    })
    return res.data
  } catch (error) {
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
