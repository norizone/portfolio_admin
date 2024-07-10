import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import type { Metadata } from 'next'
import { WorkForm } from '../../../../features/works/main/components/WorkForm'
import axios from 'axios'
import { cookies } from 'next/headers'
import { ADMIN_API_URL } from '@/utils/const'
import { ToolData } from '@/types/api/admin'
import { EditWork } from '../../../../features/works/edit/components/EditWork'
import { Work } from '@prisma/client'
import { notFound } from 'next/navigation'
import { baseURL, toolApiUrl, workApiUrl } from '@/utils/apiUrl'

export const metadata: Metadata = {
  title: '制作実績 編集',
}

const getSSRData = async (
  id: number,
): Promise<{ tool: ToolData[]; work?: Work }> => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const toolRes = await axios.get(`${baseURL}${toolApiUrl.all}`, {
      headers: { cookie },
    })
    const workRes = await axios.get(`${baseURL}${workApiUrl.detail(id)}`, {
      headers: { cookie },
    })
    return {
      tool: toolRes.data,
      work: workRes.data,
    }
  } catch (error) {
    console.log(error)
    notFound()
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
