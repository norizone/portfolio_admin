import { PrimaryHeadline } from '@/components/headline/PrimaryHeadline'
import Link from 'next/link'
import { routers } from '@/routers/routers'
import type { Metadata } from 'next'
import { ListWorks } from './_components/ListWorks'
import { PrimaryBtn } from '@/components/btn/PrimaryBtn'

export const metadata: Metadata = {
  title: '制作実績一覧',
}

export default function Works() {
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
      <ListWorks />
    </section>
  )
}
