'use client'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createEditWorks } from '@/utils/validations'
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
import { ToolData } from '@/types/api/admin'
import { useMemo, useState } from 'react'
import { styleInputMargin, styleMinInputWidth } from '@/styles/style'
import { AddToolModal } from './AddToolModal'
import { useToggleModal } from '@/hooks/ui/useToggleModal'
import { useImageUpload } from '../hooks/useImageUpload'
import { WorkFormValues } from '../types/workType'
import { ErrorMessageBox } from '@/components/elements/textBlock/ErrorMessageBox'
import { workFormDefaultValues } from '../utils/const'

type Props = {
  formType: 'create' | 'edit'
  defaultValues?: WorkFormValues
  toolData?: ToolData[]
  onHandlerSubmit: (data: WorkFormValues) => void
  isLoadingSubmit?: boolean
  isErrorSubmit?: boolean
  sendErrorMessage?: string
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
  const {
    defaultValues = workFormDefaultValues,
    formType,
    toolData,
    onHandlerSubmit,
    isLoadingSubmit,
    isErrorSubmit,
    sendErrorMessage,
  } = props
  const {
    isOpenModal: isOpenCreateToolModal,
    toggleModal: toggleCreateToolModal,
  } = useToggleModal()
  const [toolItems, setToolItems] = useState<
    { label: string; value: number }[]
  >([])

  useMemo(() => {
    const tool =
      toolData && toolData?.length > 0
        ? toolData.map((tool) => ({ value: tool.id, label: tool.toolName }))
        : []
    setToolItems(tool)
  }, [toolData])

  const { onSubmitUpload, isLoadingUpload } = useImageUpload()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
    control,
  } = useForm<WorkFormValues>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(createEditWorks),
  })

  const onSubmit = async (data: WorkFormValues) => {
    onHandlerSubmit(data)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="text-left flex flex-col gap-[2em] w-[90%] p-[5%] m-auto bg-white shadow-md"
      >
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
          <PrimaryTextArea
            customClassName={twMerge(styleInputMargin, 'min-h-[3em]')}
            placeholder="タイトル"
            {...register('title')}
          />
        </FormLabel>

        <FormLabel
          label="英文字タイトル"
          required
          errorMessage={errors?.titleEn?.message}
        >
          <PrimaryTextArea
            customClassName={twMerge(styleInputMargin, 'min-h-[3em]')}
            placeholder="title"
            {...register('titleEn')}
          />
        </FormLabel>

        <FormLabel
          label="一覧画像"
          required
          errorMessage={
            errors?.archiveImg?.message || errors.uploadArchiveImg?.message
          }
        >
          <Controller
            name="uploadArchiveImg"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImageInput
                defaultUrl={defaultValues?.archiveImg ?? ''}
                isLoading={isLoadingUpload('uploadArchiveImg')}
                customClassName={styleInputMargin}
                isNullable={false}
                onChangeFile={(value: File) => {
                  onChange(value)
                  setValue('uploadArchiveImg', value, { shouldValidate: true })
                  onSubmitUpload({
                    key: 'uploadArchiveImg',
                    file: value,
                    setValue: (url) =>
                      setValue('archiveImg', url, { shouldValidate: true }),
                    setError: (message) =>
                      setError('archiveImg', { type: 'server', message }),
                  })
                }}
              />
            )}
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
              styleInputMargin,
            )}
          >
            {toolItems?.length > 0 && (
              <Controller
                control={control}
                name="useTools"
                defaultValue={defaultValues.useTools}
                render={({ field }) => (
                  <>
                    {toolItems.map((tool, index) => (
                      <PrimaryLabelCheckBox
                        key={index}
                        customClassName="w-max mr-auto"
                        item={tool}
                        name={`useTools${tool.value}`}
                        checked={field.value.includes(tool.value)}
                        onChange={() => {
                          const newValue = field.value.includes(tool.value)
                            ? field.value.filter((id) => id !== tool.value)
                            : [...field.value, tool.value]
                          field.onChange(newValue)
                        }}
                      />
                    ))}
                  </>
                )}
              />
            )}
          </div>
        </FormLabel>

        <PrimaryBtn
          btnColor="primary"
          onClick={toggleCreateToolModal}
          btnProps={{ type: 'button' }}
          customClassName="w-max p-[.2em] min-w-[8em] min-h-[2.4em] text-sm ml-auto"
        >
          ツール追加
        </PrimaryBtn>

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

        <FormLabel label="urlへのリンク">
          <PrimaryLabelCheckBox
            customClassName='mr-auto'
            item={
              {
                value: 1,
                label: '有り'
              }
            }
            {...register('isLinkToUrl')}
          />
        </FormLabel>

        <FormLabel label="Git url" errorMessage={errors?.gitUrl?.message}>
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
          errorMessage={
            errors?.singleImgMain?.message ||
            errors.uploadSingleImgMain?.message
          }
        >
          <Controller
            name="uploadSingleImgMain"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImageInput
                defaultUrl={defaultValues?.singleImgMain ?? ''}
                isLoading={isLoadingUpload('uploadSingleImgMain')}
                customClassName={styleInputMargin}
                isNullable={false}
                onChangeFile={(value: File) => {
                  onChange(value)
                  setValue('uploadSingleImgMain', value, {
                    shouldValidate: true,
                  })
                  onSubmitUpload({
                    key: 'uploadSingleImgMain',
                    file: value,
                    setValue: (url) =>
                      setValue('singleImgMain', url, { shouldValidate: true }),
                    setError: (message) =>
                      setError('singleImgMain', { type: 'server', message }),
                  })
                }}
              />
            )}
          />
        </FormLabel>

        <FormLabel
          label="詳細ページサブ画像1"
          errorMessage={
            errors?.singleImgSub?.message || errors?.singleImgSub?.message
          }
        >
          <Controller
            name="uploadSingleImgSub"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImageInput
                defaultUrl={defaultValues?.singleImgSub ?? ''}
                isLoading={isLoadingUpload('uploadSingleImgSub')}
                customClassName={styleInputMargin}
                isNullable={false}
                onChangeFile={(value: File) => {
                  onChange(value)
                  setValue('uploadSingleImgSub', value, {
                    shouldValidate: true,
                  })
                  onSubmitUpload({
                    key: 'uploadSingleImgSub',
                    file: value,
                    setValue: (url) =>
                      setValue('singleImgSub', url, { shouldValidate: true }),
                    setError: (message) =>
                      setError('singleImgSub', { type: 'server', message }),
                  })
                }}
              />
            )}
          />
        </FormLabel>

        <FormLabel
          label="詳細ページサブ画像2"
          errorMessage={
            errors.singleImgSub2?.message ||
            errors?.uploadSingleImgSub2?.message
          }
        >
          <Controller
            name="uploadSingleImgSub2"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImageInput
                defaultUrl={defaultValues?.singleImgSub2 ?? ''}
                isLoading={isLoadingUpload('uploadSingleImgSub2')}
                customClassName={styleInputMargin}
                isNullable={true}
                onChangeFile={(value: File) => {
                  onChange(value)
                  setValue('uploadSingleImgSub2', value, {
                    shouldValidate: true,
                  })
                  onSubmitUpload({
                    key: 'uploadSingleImgSub2',
                    file: value,
                    setValue: (url) =>
                      setValue('singleImgSub2', url, { shouldValidate: true }),
                    setError: (message) =>
                      setError('singleImgSub2', { type: 'server', message }),
                  })
                }}
              />
            )}
          />
        </FormLabel>

        {isErrorSubmit && <ErrorMessageBox>{sendErrorMessage}</ErrorMessageBox>}

        <div className="flex-center mt-[2em]">
          <PrimaryBtn
            isLoading={isLoadingSubmit}
            btnColor="primary"
            btnProps={{
              type: 'submit',
            }}
          >
            {formType === 'create' ? '保存' : '更新'}
          </PrimaryBtn>
        </div>
      </form>
      <AddToolModal
        isOpenCreateModal={isOpenCreateToolModal}
        toggleCreateModal={toggleCreateToolModal}
      />
    </>
  )
}
