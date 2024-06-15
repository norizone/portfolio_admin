'use client'
import { BaseBtn } from '@/components/btn/BaseBtn'
import { PrimaryHeadline } from '@/components/headline/PrimaryHeadline'
import { LabelWithInput } from '@/components/input/LabelWithInput'

export default function AdminSetting() {
  return (
    <section className="max-w-[420px] p-[2em] text-center mx-auto h-full flex-center">
      <div className="bg-white w-full p-[2em] text-center mx-auto">
        <PrimaryHeadline lang="en" tag="h1">
          login
        </PrimaryHeadline>
        <div className="mt-[2em] p-[1em] text-left flex flex-col gap-[1em]">
          <LabelWithInput
            lang="en"
            required
            type="email"
            name="email"
            placeholder="example.mail.com"
            onChange={() => {}}
          >
            email
          </LabelWithInput>
          <LabelWithInput
            lang="en"
            required
            name="password"
            type="password"
            onChange={() => {}}
          >
            password
          </LabelWithInput>
        </div>
        <div className="mt-[2em]">
          <BaseBtn btnColor="primary" type="submit" onClick={() => {}}>
            login
          </BaseBtn>
        </div>
      </div>
    </section>
  )
}
