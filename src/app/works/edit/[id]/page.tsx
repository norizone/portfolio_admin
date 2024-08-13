import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { DetailWork, ToolData } from '@/types/api/admin'
import { EditWork } from '../../../../features/works/edit/components/EditWork'
import { notFound } from 'next/navigation'
import { baseURL, toolApiUrl, workApiUrl } from '@/utils/apiUrl'
import { fetchError } from '@/utils/fetchError'

export const metadata: Metadata = {
  title: '制作実績 編集',
}

const getSSRData = async (
  id: number,
): Promise<{ tool: ToolData[]; work?: DetailWork }> => {
  let resStatus: Response['status'] = 200
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const [toolRes, workRes] = await Promise.all([
      fetch(`${baseURL}${toolApiUrl.all()}`, {
        headers: { cookie },
        cache: "no-store"
      }),
      fetch(`${baseURL}${workApiUrl.detail(id)}`, {
        headers: { cookie },
        cache: "no-store"
      }),
    ])

    if (!toolRes.ok) {
      resStatus = toolRes.status
      throw new Error(`Tool API error: ${toolRes.status}`);
    }
    if (!workRes.ok) {
      resStatus = workRes.status
      throw new Error(`Work API error: ${workRes.status}`);
    }

    return {
      tool: await toolRes.json(),
      work: await workRes.json(),
    }
  } catch (error) {
    return { tool: [] }
  }
  if (resStatus !== 200) fetchError(resStatus)
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
