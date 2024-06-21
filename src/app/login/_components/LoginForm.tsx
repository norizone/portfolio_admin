'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '@/utils/validations'
import { FormLabel } from '@/components/textBlock/FormLabel'
import { PrimaryBtn } from '@/components/btn/PrimaryBtn'
import { PrimaryInput } from '@/components/input/PrimaryInput'
import { LoginBody } from '@/types/api/front'
import { useMutateLogin } from '@/hooks/api/front.hooks'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { routers } from '@/routers/routers'

export const LoginForm = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  })

  const {
    mutate: mutateLogin,
    isPending: isLoginPending,
    isError,
  } = useMutateLogin()

  const onSubmit = (data: LoginBody) => {
    mutateLogin(data, {
      onSuccess: () => {
        router.replace(routers.DASHBOARD)
      },
      onError: (res) => {
        setErrorMessage(res?.message)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mt-[2em] p-[1em] text-left flex flex-col gap-[1.2em]">
        <FormLabel
          label="email"
          lang="en"
          required
          errorMessage={errors?.email?.message}
        >
          <PrimaryInput
            type="email"
            placeholder="example.mail.com"
            {...register('email')}
          />
        </FormLabel>
        <FormLabel
          label="password"
          lang="en"
          required
          errorMessage={errors?.password?.message}
        >
          <PrimaryInput type="password" {...register('password')} />
        </FormLabel>
      </div>
      {isError && <p>{errorMessage}</p>}
      <div className="mt-[2em] flex-center">
        <PrimaryBtn
          isLoading={isLoginPending}
          btnColor="primary"
          btnProps={{
            type: 'submit',
          }}
          onClick={() => {}}
        >
          login
        </PrimaryBtn>
      </div>
    </form>
  )
}
