import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import Link from 'next/link'
import { routers } from '@/routers/routers'
import type { Metadata } from 'next'
import { WorkList } from './_components/WorkList'
import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { Work } from '@prisma/client'
import axios from 'axios'
import { cookies } from 'next/headers'
import { ADMIN_API_URL } from '@/utils/const'
import { WorkListRes } from '@/types/api/admin'

export const metadata: Metadata = {
  title: '制作実績一覧',
}

const PAGE_SiZE = 1
const DEFAULT_PAGE = 1

const getWorkList = async (): Promise<WorkListRes> => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await axios.post(
      `${ADMIN_API_URL}/work/list`,
      {
        page: DEFAULT_PAGE,
        pageSize: PAGE_SiZE,
      },
      {
        headers: { cookie },
      }
    )
    return res.data
  } catch (error) {
    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
    }
  }
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
      <WorkList SSRData={dataWorkList} pageSize={1} defaultPage={1} />
    </section>
  )
}
