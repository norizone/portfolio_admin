'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '@/utils/validations'
import { FormLabel } from '@/components/elements/textBlock/FormLabel'
import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { PrimaryInput } from '@/components/elements/input/PrimaryInput'
import { LoginBody } from '@/types/api/admin'
import { useMutateLogin, useMutateSignUp } from '@/hooks/api/admin.hooks'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { routers } from '@/routers/routers'
import { ErrorMessageBox } from '@/components/elements/textBlock/ErrorMessageBox'
import { PasswordInput } from '@/components/elements/input/PasswordInput'

type Props = {
  formType: 'login' | 'signUp'
}

export const SignForm = (props: Props) => {
  const { formType = 'login' } = props
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
    isError: isLoginError,
  } = useMutateLogin()

  const {
    mutate: mutateSignUp,
    isPending: isSignUpPending,
    isError: isLSignUpError,
  } = useMutateSignUp()

  const onSubmit = (data: LoginBody) => {
    formType === 'signUp'
      ? mutateSignUp(data, {
          onSuccess: () => {
            router.replace(routers.LOGIN)
          },
          onError: (res) => {
            setErrorMessage(res?.message)
          },
        })
      : mutateLogin(data, {
          onSuccess: () => {
            router.replace(routers.DASHBOARD)
          },
          onError: (res) => {
            console.log(res)
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
            autocomplete="email"
            {...register('email')}
          />
        </FormLabel>
        <FormLabel
          label="password"
          lang="en"
          required
          errorMessage={errors?.password?.message}
        >
          <PasswordInput
            autocomplete={
              formType === 'signUp' ? 'new-password' : 'current-password'
            }
            {...register('password')}
          />
        </FormLabel>
      </div>
      {(isLoginError || isLSignUpError) && (
        <ErrorMessageBox customClassName="mt-[1em]">
          {errorMessage}
        </ErrorMessageBox>
      )}
      <div className="mt-[2em] flex-center">
        <PrimaryBtn
          isLoading={isLoginPending || isSignUpPending}
          btnColor="primary"
          btnProps={{
            type: 'submit',
          }}
          onClick={() => {}}
        >
          {formType}
        </PrimaryBtn>
      </div>
    </form>
  )
}
