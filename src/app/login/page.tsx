'use client'
import { BaseBtn } from '@/components/btn/BaseBtn'
import { PrimaryHeadline } from '@/components/headline/PrimaryHeadline'

export default function AdminSetting() {
  return (
    <section className="max-w-[420px] p-[2em] text-center mx-auto h-full flex-center">
      <div className="bg-white w-full p-[2em] text-center mx-auto">
        <PrimaryHeadline lang="en" tag="h1">
          login
        </PrimaryHeadline>
        <div className="mt-[2em] p-[2em] text-left flex flex-col gap-[1em]">
          <label>
            <p className="font-en">
              <span className="text-error">* </span>
              <span>email</span>
            </p>
            <input className="border border-border w-full" type="email"></input>
          </label>
          <label>
            <p className="font-en">
              <span className="text-error">* </span>
              <span>password</span>
            </p>
            <input
              className="border border-border w-full"
              type="password"
            ></input>
          </label>
        </div>
        <div className="mt-[2em]">
          <BaseBtn btnColor="primary" onClick={() => {}}>
            login
          </BaseBtn>
        </div>
      </div>
    </section>
  )
}
