import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import type { Metadata } from 'next'
import { SignForm } from '@/components/layouts/sign/SignForm'

export const metadata: Metadata = {
  title: 'ログイン',
}

export default function AdminSetting() {
  return (
    <section className="max-w-[420px] p-[2em] text-center mx-auto h-full flex-center">
      <div className="bg-white w-full p-[2em] text-center mx-auto">
        <PrimaryHeadline lang="en" tag="h1">
          sign up
        </PrimaryHeadline>
        <SignForm formType="signUp" />
      </div>
    </section>
  )
}
