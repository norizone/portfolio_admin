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
import { CreateWorkBody } from '@/types/api/front'
import { useGetToolList, useMutateCreateWork } from '@/hooks/api/front.hooks'
import { useMemo, useState } from 'react'
import { selectItem } from '@/types/SelectItems'

type Props = {
  formType: 'create' | 'edit'
}

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

const defaultValues = {
  order: 1,
  permission: 1,
  publication: 1,
  title: '',
  titleEn: '',
  archiveImg: 'こめ',
  useTools: [],
  comment: 'こめ',
  url: 'こめ',
  gitUrl: 'こめ',
  role: 'こめ',
  singleImgMain: 'こめ',
  singleImgSub: 'こめ',
  singleImgSub2: 'こめ',
}

const inputMargin = 'mx-[1em] mt-[.2em] w-[calc(100%_-_2em)]'
const minInputWidth = 'w-[12em]'

export const CreateForm = (props: Props) => {
  const { data: toolList } = useGetToolList()
  const [toolItems, setToolItems] = useState<selectItem[]>([])
  const { mutate } = useMutateCreateWork()

  useMemo(() => {
    const tool =
      toolList && toolList?.length > 0
        ? toolList.map((tool) => ({ value: tool.id, label: tool.toolName }))
        : []
    setToolItems(tool)
  }, [toolList])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<CreateWorkBody>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(createWorks),
  })

  const onSubmit = async (data: CreateWorkBody) => {
    mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="text-left flex flex-col gap-[2em] w-[90%] p-[5%] m-auto bg-white shadow-md"
    >
      <FormLabel
        label="表示権限"
        required
        errorMessage={errors?.order?.message}
      >
        <PrimaryInput
          customClassName={twMerge(inputMargin, minInputWidth)}
          type="number"
          placeholder="並び順"
          {...register('order')}
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
        label="公開状態"
        required
        errorMessage={errors?.publication?.message}
      >
        <PrimarySelectBox
          customClassName={twMerge(inputMargin, minInputWidth)}
          optionItems={publicStatusItems}
          placeholder="選択してください"
          value={watch('publication')}
          {...register('publication')}
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
        label="一覧画像"
        required
        errorMessage={errors?.archiveImg?.message}
      >
        <input hidden {...register('archiveImg')} value="img" />
        {/* <ImageInput customClassName={inputMargin} {...register('archiveImg')} /> */}
      </FormLabel>

      <FormLabel
        label="使用ツール"
        required
        errorMessage={errors?.useTools?.message}
        as="p"
      >
        <div
          className={twMerge(
            'flex flex-row flex-wrap gap-x-[2em] gap-y-[1em] w-full px-[.4em]',
            inputMargin
          )}
        >
          {toolItems?.length > 0 &&
            toolItems.map((tool, index) => (
              <Controller
                key={index}
                defaultValue={[]}
                control={control}
                name="useTools"
                render={({ field }) => (
                  <PrimaryLabelCheckBox item={tool} {...register('useTools')} />
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

      <FormLabel label="git_url" errorMessage={errors?.gitUrl?.message}>
        <PrimaryInput
          customClassName={inputMargin}
          type="url"
          placeholder="http://"
          {...register('gitUrl')}
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

      <FormLabel
        label="詳細ページメイン画像"
        required
        errorMessage={errors?.singleImgMain?.message}
      >
        <input hidden {...register('singleImgMain')} value="img" />
        {/* <ImageInput
          customClassName={inputMargin}
          {...register('singleImgMain')}
        /> */}
      </FormLabel>

      <FormLabel
        label="詳細ページサブ画像1"
        required
        errorMessage={errors?.singleImgSub?.message}
      >
        <input hidden {...register('singleImgSub')} value="img" />
        {/* <ImageInput
          customClassName={inputMargin}
          {...register('singleImgSub')}
        /> */}
      </FormLabel>

      <FormLabel
        label="詳細ページサブ画像2"
        errorMessage={errors?.singleImgSub2?.message}
      >
        <input hidden {...register('singleImgSub2')} value="img" />
        {/* <ImageInput
        {/* <ImageInput
          customClassName={inputMargin}
          {...register('singleImgSub2')}
        /> */}
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
