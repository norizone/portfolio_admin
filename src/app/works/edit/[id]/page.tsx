import { PrimaryHeadline } from '@/components/headline/PrimaryHeadline'

import type { Metadata } from 'next'
import { WorkForm } from '../../_components/WorkForm'

export const metadata: Metadata = {
  title: '制作実績 編集',
}

export default function Works() {
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        制作実績 編集
      </PrimaryHeadline>
      <div className="mt-[3em]">
        <WorkForm formType={'edit'} />
      </div>
    </section>
  )
}
