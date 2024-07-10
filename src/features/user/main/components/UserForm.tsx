'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserSchema } from '@/utils/validations'
import { FormLabel } from '@/components/elements/textBlock/FormLabel'
import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { PrimaryInput } from '@/components/elements/input/PrimaryInput'
import { CreateUserBody, EditUserBody } from '@/types/api/admin'
import { twMerge } from 'tailwind-merge'
import { styleInputMargin, styleMinInputWidth } from '@/styles/style'
import { PrimarySelectBox } from '@/components/elements/selectBox/PrimarySelectBox'
import { convertUserRole } from '@/utils/converter'
import { USER_ROLE } from '@/utils/enum'
import { ErrorMessageBox } from '@/components/elements/textBlock/ErrorMessageBox'

type Props = {
  formType: 'create' | 'edit'
  defaultValues?: EditUserBody
  formClassName?: string
  onSubmitCreate?: (data: CreateUserBody) => void
  onSubmitEdit?: (data: EditUserBody) => void
  isError?: boolean
  submitErrorMessage?: string
  isLoading?: boolean
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
    onSubmitCreate,
    onSubmitEdit,
    isError,
    submitErrorMessage,
    isLoading,
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

  const handleOnSubmit = async (data: CreateUserBody) => {
    formType === 'create'
      ? onSubmitCreate && onSubmitCreate(data)
      : onSubmitEdit &&
        onSubmitEdit({
          email: data.email,
          permission: data.permission,
        })
  }

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
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

      {formType === 'create' ? (
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
      ) : (
        <input hidden {...register('password')} value={'**********'} />
      )}

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
      <div className="flex-center flex-col">
        {isError && (
          <ErrorMessageBox customClassName="max-w-[400px]">
            {submitErrorMessage}
          </ErrorMessageBox>
        )}
        <PrimaryBtn
          customClassName="mt-[2em]"
          isLoading={isLoading}
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
