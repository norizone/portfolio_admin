'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserSchema } from '@/utils/validations'
import { FormLabel } from '@/components/elements/textBlock/FormLabel'
import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { PrimaryInput } from '@/components/elements/input/PrimaryInput'
import { CreateUserBody } from '@/types/api/front'
import { twMerge } from 'tailwind-merge'
import { styleInputMargin, styleMinInputWidth } from '@/styles/style'
import { PrimarySelectBox } from '@/components/elements/selectBox/PrimarySelectBox'
import { convertUserRole } from '@/utils/converter'
import { USER_ROLE } from '@/utils/enum'

type Props = {
  formType: 'create' | 'edit'
  defaultValues?: CreateUserBody
  formClassName?: string
  onComplete?: () => void
  setCompleteMessage?: (v: string) => void
}

const permissionItems = Object.keys(convertUserRole).map((key) => ({
  label: convertUserRole[+key as USER_ROLE],
  value: key,
}))

export const UserForm = (props: Props) => {
  const {
    defaultValues = {},
    formType,
    formClassName,
    onComplete,
    setCompleteMessage,
  } = props
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserBody>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(createUserSchema),
  })

  const onSubmit = async (data: CreateUserBody) => {
    console.log(data)
    onComplete && onComplete()
    setCompleteMessage && setCompleteMessage('更新しました')
    // formType === 'create' ? mutate(data) : ''
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={twMerge(
        'text-left flex flex-col gap-[2em] p-[5%] m-auto',
        formClassName
      )}
    >
      <FormLabel label="email" required errorMessage={errors?.email?.message}>
        <PrimaryInput
          customClassName={styleInputMargin}
          type="email"
          placeholder="example@mail.jp"
          {...register('email')}
        />
      </FormLabel>

      <FormLabel
        label="password"
        required
        errorMessage={errors?.password?.message}
      >
        <PrimaryInput
          customClassName={styleInputMargin}
          type="password"
          {...register('password')}
        />
      </FormLabel>

      <FormLabel
        label="ユーザー権限"
        required
        errorMessage={errors?.permission?.message}
      >
        <PrimarySelectBox
          customClassName={twMerge(styleInputMargin, styleMinInputWidth)}
          optionItems={permissionItems}
          placeholder="選択してください"
          value={watch('permission')}
          {...register('permission')}
        />
      </FormLabel>

      <div className="flex-center mt-[2em]">
        <PrimaryBtn
          btnColor="primary"
          btnProps={{
            type: 'submit',
          }}
        >
          {formType === 'create' ? '保存' : '更新'}
        </PrimaryBtn>
      </div>
    </form>
  )
}
