'use client'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createWorks } from '@/utils/validations'
import { FormLabel } from '@/components/elements/textBlock/FormLabel'
import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { PrimaryInput } from '@/components/elements/input/PrimaryInput'
import { PrimaryLabelCheckBox } from '@/components/elements/checkBox/PrimaryLabelCheckBox'
import { twMerge } from 'tailwind-merge'
import { PrimarySelectBox } from '@/components/elements/selectBox/PrimarySelectBox'
import { PrimaryTextArea } from '@/components/elements/textArea/PrimaryTextArea'
import { PUBLICATION_STATUS, VIEW_PERMISSION } from '@/utils/enum'
import { convertPublication, convertViewPermission } from '@/utils/converter'
import { ImageInput } from '@/components/elements/input/ImageInput'
import { CreateWorkBody } from '@/types/api/admin'
import { useGetToolList, useMutateCreateWork } from '@/hooks/api/admin.hooks'
import { useMemo, useState } from 'react'
import { selectItem } from '@/types/SelectItems'
import { styleInputMargin, styleMinInputWidth } from '@/styles/style'

type Props = {
  formType: 'create' | 'edit'
  defaultValues?: CreateWorkBody
}

type WorkFormValues = Omit<CreateWorkBody, 'useTools'> & {
  useTools: number[]
}

const publicStatusItems = Object.keys(convertPublication).map((key) => ({
  label: convertPublication[+key as PUBLICATION_STATUS],
  value: key,
}))

const permissionItems = Object.keys(convertViewPermission).map((key) => ({
  label: convertViewPermission[+key as VIEW_PERMISSION],
  value: key,
}))

export const WorkForm = (props: Props) => {
  const { defaultValues = {}, formType } = props
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
  } = useForm<WorkFormValues>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(createWorks),
  })

  const onSubmit = async (data: WorkFormValues) => {
    const selectedTool = data.useTools
    const body = {
      ...data,
      useTools: selectedTool.map((tool) => ({
        id: tool,
      })),
    }
    console.log(body)
    formType === 'create' ? mutate(body) : ''
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
          customClassName={twMerge(styleInputMargin, styleMinInputWidth)}
          type="number"
          placeholder="並び順"
          inputProps={{
            min: 1,
            max: 9007199254740991,
          }}
          {...register('order')}
        />
      </FormLabel>

      <FormLabel
        label="表示権限"
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

      <FormLabel
        label="公開状態"
        required
        errorMessage={errors?.publication?.message}
      >
        <PrimarySelectBox
          customClassName={twMerge(styleInputMargin, styleMinInputWidth)}
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
          customClassName={styleInputMargin}
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
          customClassName={styleInputMargin}
          {...register('titleEn')}
        />
      </FormLabel>

      <FormLabel
        label="一覧画像"
        required
        errorMessage={errors?.archiveImg?.message}
      >
        <ImageInput
          customClassName={styleInputMargin}
          {...register('archiveImg')}
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
            'grid grid-cols-[repeat(4,max-content)] gap-y-[1em] w-full px-[.4em] justify-between max-w-[800px]',
            styleInputMargin
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
                  <PrimaryLabelCheckBox
                    customClassName="w-max mr-auto"
                    item={tool}
                    {...register('useTools')}
                  />
                )}
              />
            ))}
        </div>
      </FormLabel>

      <FormLabel label="コメント" errorMessage={errors?.comment?.message}>
        <PrimaryTextArea
          customClassName={styleInputMargin}
          {...register('comment')}
        />
      </FormLabel>

      <FormLabel label="url" errorMessage={errors?.url?.message}>
        <PrimaryInput
          customClassName={styleInputMargin}
          type="url"
          placeholder="http://"
          {...register('url')}
        />
      </FormLabel>

      <FormLabel label="git_url" errorMessage={errors?.gitUrl?.message}>
        <PrimaryInput
          customClassName={styleInputMargin}
          type="url"
          placeholder="http://"
          {...register('gitUrl')}
        />
      </FormLabel>

      <FormLabel label="役割" required errorMessage={errors?.role?.message}>
        <PrimaryInput
          customClassName={styleInputMargin}
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
        <ImageInput
          customClassName={styleInputMargin}
          {...register('singleImgMain')}
        />
      </FormLabel>

      <FormLabel
        label="詳細ページサブ画像1"
        required
        errorMessage={errors?.singleImgSub?.message}
      >
        <ImageInput
          customClassName={styleInputMargin}
          {...register('singleImgSub')}
        />
      </FormLabel>

      <FormLabel
        label="詳細ページサブ画像2"
        errorMessage={errors?.singleImgSub2?.message}
      >
        <ImageInput
          customClassName={styleInputMargin}
          {...register('singleImgSub2')}
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
