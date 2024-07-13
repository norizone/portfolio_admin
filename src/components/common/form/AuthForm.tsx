'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '@/utils/validations'
import { FormLabel } from '@/components/elements/textBlock/FormLabel'
import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { PrimaryInput } from '@/components/elements/input/PrimaryInput'
import { LoginBody } from '@/types/api/admin'
import { ErrorMessageBox } from '@/components/elements/textBlock/ErrorMessageBox'
import { PasswordInput } from '@/components/elements/input/PasswordInput'

type Props = {
  handlerSubmit: (data: LoginBody) => void
  isLoading?: boolean
  errorMessage?: string
  isError?: boolean
  formType?: 'signUp' | 'login'
}

export const AuthForm = (props: Props) => {
  const {
    handlerSubmit,
    isLoading,
    errorMessage,
    isError,
    formType = 'login',
  } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = (data: LoginBody) => {
    handlerSubmit(data)
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
      {isError && (
        <ErrorMessageBox customClassName="mt-[1em]">
          {errorMessage}
        </ErrorMessageBox>
      )}
      <div className="mt-[2em] flex-center">
        <PrimaryBtn
          isLoading={isLoading}
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
