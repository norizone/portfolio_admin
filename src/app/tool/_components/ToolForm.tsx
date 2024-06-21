'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createToolSchema } from '@/utils/validations'
import { FormLabel } from '@/components/elements/textBlock/FormLabel'
import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { PrimaryInput } from '@/components/elements/input/PrimaryInput'
import { CreateToolBody } from '@/types/api/front'
import { twMerge } from 'tailwind-merge'
import { styleInputMargin } from '@/styles/style'

type Props = {
  formType: 'create' | 'edit'
  defaultValues?: CreateToolBody
  formClassName?: string
  onComplete?: () => void
  setCompleteMessage?: (v: string) => void
}

export const ToolForm = (props: Props) => {
  const {
    defaultValues = {},
    formType,
    formClassName,
    onComplete,
    setCompleteMessage,
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

  const onSubmit = async (data: CreateToolBody) => {
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
      <FormLabel
        label="ツール名"
        required
        errorMessage={errors?.toolName?.message}
      >
        <PrimaryInput
          customClassName={styleInputMargin}
          type="text"
          placeholder="React"
          {...register('toolName')}
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
