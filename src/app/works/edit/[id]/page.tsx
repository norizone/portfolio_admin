import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import type { Metadata } from 'next'
import { WorkForm } from '../../_components/WorkForm'
import axios from 'axios'
import { cookies } from 'next/headers'
import { ADMIN_API_URL } from '@/utils/const'
import { ToolData } from '@/types/api/admin'
import { EditWork } from './_components/EditWork'
import { Work } from '@prisma/client'

type Props = {
  params: { slug: string }
}

export const metadata: Metadata = {
  title: '制作実績 編集',
}

const getSSRData = async (
  id: number
): Promise<{ tool: ToolData[]; work?: Work }> => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await axios.get(`${ADMIN_API_URL}/tool/list`, {
      headers: { cookie },
    })
    const workRes = await axios.get(`${ADMIN_API_URL}/work/${id}`, {
      headers: { cookie },
    })

    return {
      tool: res.data,
      work: workRes.data,
    }
  } catch (error) {
    return {
      tool: [],
      work: undefined,
    }
  }
}

export default async function Works({ params }: { params: { id: string } }) {
  const { id } = params
  const SSRData = await getSSRData(Number(id))
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        制作実績 編集
      </PrimaryHeadline>
      <div className="mt-[3em]">
        <EditWork
          SSRToolData={SSRData.tool}
          SSRWorkData={SSRData.work}
          id={Number(id)}
        />
      </div>
    </section>
  )
}
