import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { DetailWork, ToolData } from '@/types/api/admin'
import { EditWork } from '../../../../features/works/edit/components/EditWork'
import { notFound } from 'next/navigation'
import { baseURL, toolApiUrl, workApiUrl } from '@/utils/apiUrl'

export const metadata: Metadata = {
  title: '制作実績 編集',
}

const getSSRData = async (
  id: number,
): Promise<{ tool: ToolData[]; work?: DetailWork }> => {
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

    return {
      tool: await toolRes.json(),
      work: await workRes.json(),
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
