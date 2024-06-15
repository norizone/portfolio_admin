'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { BaseBtn } from '@/components/btn/BaseBtn'
import { loginSchema } from '@/utils/validations'
import { FormLabel } from '@/components/textBlock/FormLabel'
import BaseInput from '@/components/input/BaseInput'

type LoginDate = {
  email: string
  password: string
}

const defaultValues = {
  email: '',
  password: '',
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDate>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = (data: LoginDate) => {
    console.log(data)
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
          <BaseInput
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
          <BaseInput type="password" {...register('password')} />
        </FormLabel>
      </div>
      <div className="mt-[2em]">
        <BaseBtn btnColor="primary" type="submit" onClick={() => {}}>
          login
        </BaseBtn>
      </div>
    </form>
  )
}
