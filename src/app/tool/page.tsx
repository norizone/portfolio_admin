import { PrimaryHeadline } from '@/components/headline/PrimaryHeadline'
import type { Metadata } from 'next'
import { ToolList } from './_components/ToolList'
import { ToolCreate } from './_components/ToolCreate'

export const metadata: Metadata = {
  title: 'ツール一覧',
}

export default function Tool() {
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        ツール一覧
      </PrimaryHeadline>
      <div className="mt-[2em] w-max ml-auto">
        <ToolCreate />
      </div>
      <ToolList />
    </section>
  )
}
