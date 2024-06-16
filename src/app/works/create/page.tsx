import { PrimaryHeadline } from '@/components/headline/PrimaryHeadline'
import { CreateForm } from '../components/CreateForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '新規作成',
}

export default function Works() {
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        制作実績 新規作成
      </PrimaryHeadline>
      <div className="mt-[3em]">
        <CreateForm formType={'create'} />
      </div>
    </section>
  )
}
