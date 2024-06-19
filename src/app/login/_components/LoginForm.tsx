'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '@/utils/validations'
import { FormLabel } from '@/components/textBlock/FormLabel'
import { PrimaryBtn } from '@/components/btn/PrimaryBtn'
import { PrimaryInput } from '@/components/input/PrimaryInput'

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
      <div className="mt-[2em] flex-center">
        <PrimaryBtn
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
