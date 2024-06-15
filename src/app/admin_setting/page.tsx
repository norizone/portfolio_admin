'use client'
import { PrimaryHeadline } from '@/components/headline/PrimaryHeadline'

export default function AdminSetting() {
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        管理者設定
      </PrimaryHeadline>
      <div className="mt-[2em]">
        <p>パスワード再設定</p>
      </div>
    </section>
  )
}
