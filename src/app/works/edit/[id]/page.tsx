import { PrimaryHeadline } from '@/components/headline/PrimaryHeadline'

import type { Metadata } from 'next'
import { CreateForm } from '../../components/CreateForm'

export const metadata: Metadata = {
  title: '新規作成',
}

export default function Works() {
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        制作実績 編集
      </PrimaryHeadline>
      <div className="mt-[3em]">
        <CreateForm formType={'edit'} />
      </div>
    </section>
  )
}
