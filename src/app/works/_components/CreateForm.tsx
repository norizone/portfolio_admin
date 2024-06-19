'use client'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createWorks, loginSchema } from '@/utils/validations'
import { FormLabel } from '@/components/textBlock/FormLabel'
import { PrimaryBtn } from '@/components/btn/PrimaryBtn'
import { PrimaryInput } from '@/components/input/PrimaryInput'
import { PrimaryLabelCheckBox } from '@/components/checkBox/PrimaryLabelCheckBox'
import { twMerge } from 'tailwind-merge'
import { PrimarySelectBox } from '@/components/selectBox/PrimarySelectBox'
import { PrimaryTextArea } from '@/components/textArea/PrimaryTextArea'
import { PUBLICATION_STATUS } from '@/utils/enum'
import { convertPublication } from '@/utils/converter'
import { ImageInput } from '@/components/input/ImageInput'

type CreateWorks = {
  status: number
  title: string
  titleEn: string
  archiveImg: unknown
  useTools: []
  comment?: string
  url?: string
  role?: string
  singleImgMain: unknown
  singleImgSub1?: unknown
  singleImgSub2?: unknown
  gitUrl?: string
  permission?: number
}

type Props = {
  formType: 'create' | 'edit'
}

const tools = [
  {
    label: 't',
    value: 1,
  },
  {
    label: 'e',
    value: 2,
  },
  {
    label: 'r',
    value: 3,
  },
  {
    label: 'u',
    value: 4,
  },
  {
    label: 'i',
    value: 5,
  },
]

const publicStatusItems = Object.keys(convertPublication).map((key) => ({
  label: convertPublication[+key as PUBLICATION_STATUS],
  value: key,
}))

const permissionItems = [
  {
    value: 1,
    label: '制限',
  },
  {
    value: 2,
    label: '制限なし',
  },
]

const inputMargin = 'mx-[1em] mt-[.2em] w-[calc(100%_-_2em)]'
const minInputWidth = 'w-[12em]'

export const CreateForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<CreateWorks>({
    mode: 'onBlur',
    resolver: yupResolver(createWorks),
  })

  const onSubmit = (data: CreateWorks) => {
    console.log(data)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="text-left flex flex-col gap-[2em] w-[90%] p-[5%] m-auto bg-white shadow-md"
    >
      <FormLabel
        label="公開状態"
        required
        errorMessage={errors?.status?.message}
      >
        <PrimarySelectBox
          customClassName={twMerge(inputMargin, minInputWidth)}
          optionItems={publicStatusItems}
          placeholder="選択してください"
          value={watch('status')}
          {...register('status')}
        />
      </FormLabel>

      <FormLabel
        label="表示権限"
        required
        errorMessage={errors?.permission?.message}
      >
        <PrimarySelectBox
          customClassName={twMerge(inputMargin, minInputWidth)}
          optionItems={permissionItems}
          placeholder="選択してください"
          value={watch('permission')}
          {...register('permission')}
        />
      </FormLabel>

      <FormLabel
        label="タイトル"
        required
        errorMessage={errors?.title?.message}
      >
        <PrimaryInput
          customClassName={inputMargin}
          type="text"
          placeholder="タイトル"
          {...register('title')}
        />
      </FormLabel>

      <FormLabel
        label="英文字タイトル"
        required
        errorMessage={errors?.titleEn?.message}
      >
        <PrimaryInput
          type="text"
          placeholder="title"
          customClassName={inputMargin}
          {...register('titleEn')}
        />
      </FormLabel>

      <FormLabel
        label="アーカイブ画像"
        required
        errorMessage={errors?.archiveImg?.message}
      >
        <ImageInput customClassName={inputMargin} {...register('archiveImg')} />
      </FormLabel>

      <FormLabel
        label="詳細ページpc画面画像"
        required
        errorMessage={errors?.singleImgMain?.message}
      >
        <ImageInput
          customClassName={inputMargin}
          {...register('singleImgMain')}
        />
      </FormLabel>

      <FormLabel
        label="詳細ページsp画面画像1"
        required
        errorMessage={errors?.singleImgSub1?.message}
      >
        <ImageInput
          customClassName={inputMargin}
          {...register('singleImgSub1')}
        />
      </FormLabel>

      <FormLabel
        label="詳細ページsp画面画像2"
        errorMessage={errors?.singleImgSub2?.message}
      >
        <ImageInput
          customClassName={inputMargin}
          {...register('singleImgSub2')}
        />
      </FormLabel>

      <FormLabel
        label="使用ツール"
        required
        errorMessage={errors?.useTools?.message}
        as="p"
      >
        <div
          className={twMerge(
            'flex flex-row flex-wrap gap-x-[2em] gap-y-[1.6em] w-full px-[.4em]',
            inputMargin
          )}
        >
          {tools.map((tool, index) => (
            <Controller
              key={index}
              defaultValue={[]}
              control={control}
              name="useTools"
              render={({ field }) => (
                <PrimaryLabelCheckBox
                  label={tool.label ?? ''}
                  value={tool.value}
                  {...register('useTools')}
                />
              )}
            />
          ))}
        </div>
      </FormLabel>

      <FormLabel label="コメント" errorMessage={errors?.comment?.message}>
        <PrimaryTextArea
          customClassName={inputMargin}
          {...register('comment')}
        />
      </FormLabel>

      <FormLabel label="url" errorMessage={errors?.url?.message}>
        <PrimaryInput
          customClassName={inputMargin}
          type="url"
          placeholder="http://"
          {...register('url')}
        />
      </FormLabel>

      <FormLabel label="役割" required errorMessage={errors?.role?.message}>
        <PrimaryInput
          customClassName={inputMargin}
          type="url"
          placeholder="front-end"
          {...register('role')}
        />
      </FormLabel>

      <FormLabel label="git_url" errorMessage={errors?.gitUrl?.message}>
        <PrimaryInput
          customClassName={inputMargin}
          type="url"
          placeholder="http://"
          {...register('gitUrl')}
        />
      </FormLabel>

      <div className="flex-center mt-[2em]">
        <PrimaryBtn
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
