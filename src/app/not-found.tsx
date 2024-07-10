import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import { routers } from '@/routers/routers'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section>
      <PrimaryHeadline tag="h1" lang="en">
        404
      </PrimaryHeadline>
      <div className="flex-center flex-col">
        <p className="mt-[5em]">ページが見つかりませんでした。</p>
        <div className="mt-[3em] text-center">
          <PrimaryBtn
            as={Link}
            btnColor="primary"
            linkProps={{
              href: routers.DASHBOARD,
            }}
          >
            トップに戻る
          </PrimaryBtn>
        </div>
      </div>
    </section>
  )
}
