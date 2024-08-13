import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import Link from 'next/link'
import { routers } from '@/routers/routers'
import type { Metadata } from 'next'
import { WorkList } from '../../features/works/root/components/WorkList'
import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { cookies } from 'next/headers'
import { WorkListRes } from '@/types/api/admin'
import { baseURL, workApiUrl } from '@/utils/apiUrl'
import { fetchError } from '@/utils/fetchError'

export const metadata: Metadata = {
  title: '制作実績一覧',
}

const PAGE_SiZE = 10
const DEFAULT_PAGE = 1

const getWorkList = async (): Promise<WorkListRes> => {
  let resStatus: Response['status'] = 0
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await fetch(
      `${baseURL}${workApiUrl.list()}`,
      {
        method: "POST",
        headers: { cookie, "Content-Type": "application/json", },
        body: JSON.stringify({
          page: DEFAULT_PAGE,
          pageSize: PAGE_SiZE,
        }),
        cache: "no-store",
      },
    )
    if (!res.ok) {
      throw new Error(`HTTPエラー: ステータスコード ${res.status}`);
    }
    resStatus = res.status
    return await res.json();
  } catch (error) {
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
    }
  }
  if (resStatus !== 200) fetchError(resStatus)
}

export default async function Works() {
  const dataWorkList = await getWorkList()
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        制作実績一覧
      </PrimaryHeadline>
      <div className="mt-[2em] w-max ml-auto">
        <PrimaryBtn
          as={Link}
          btnColor="primary"
          linkProps={{
            href: routers.WORKS_CREATE,
          }}
        >
          新規作成
        </PrimaryBtn>
      </div>
      <WorkList
        SSRData={dataWorkList}
        pageSize={PAGE_SiZE}
        defaultPage={DEFAULT_PAGE}
      />
    </section>
  )
}
