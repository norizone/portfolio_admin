import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import type { Metadata } from 'next'
import { SingUpForm } from '@/features/singup/components/SingUpForm'

export const metadata: Metadata = {
  title: 'サインアップ',
}

export default function AdminSetting() {
  return (
    <section className="max-w-[420px] w-full p-[2em] text-center mx-auto h-full flex-center">
      <div className="bg-white w-full p-[2em] text-center mx-auto">
        <PrimaryHeadline lang="en" tag="h1">
          sign up
        </PrimaryHeadline>
        <SingUpForm />
      </div>
    </section>
  )
}
