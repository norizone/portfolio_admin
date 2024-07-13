'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createToolSchema } from '@/utils/validations'
import { FormLabel } from '@/components/elements/textBlock/FormLabel'
import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { PrimaryInput } from '@/components/elements/input/PrimaryInput'
import { CreateToolBody } from '@/types/api/admin'
import { twMerge } from 'tailwind-merge'
import { styleInputMargin } from '@/styles/style'
import { ErrorMessageBox } from '@/components/elements/textBlock/ErrorMessageBox'

type Props = {
  defaultValues?: CreateToolBody
  formClassName?: string
  onSubmit: (data: CreateToolBody) => void
  isLoading?: boolean
  isError?: boolean
  submitErrorMessage?: string
}

export const CreateToolForm = (props: Props) => {
  const {
    defaultValues = {},
    formClassName,
    onSubmit,
    isLoading,
    isError,
    submitErrorMessage,
  } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateToolBody>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(createToolSchema),
  })

  const handlerSubmit = (data: CreateToolBody) => onSubmit(data)

  return (
    <form
      onSubmit={handleSubmit(handlerSubmit)}
      noValidate
      className={twMerge('text-left p-[5%] m-auto', formClassName)}
    >
      <FormLabel
        label="ツール名"
        required
        errorMessage={errors?.toolName?.message}
        customClassName="mb-[2em]"
      >
        <PrimaryInput
          customClassName={styleInputMargin}
          type="text"
          placeholder="React"
          {...register('toolName')}
        />
      </FormLabel>

      {isError && (
        <ErrorMessageBox customClassName="">
          {submitErrorMessage}
        </ErrorMessageBox>
      )}

      <div className="flex-center mt-[2em]">
        <PrimaryBtn
          isLoading={isLoading}
          btnColor="primary"
          btnProps={{
            type: 'submit',
          }}
        >
          保存
        </PrimaryBtn>
      </div>
    </form>
  )
}
