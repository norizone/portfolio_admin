'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import BaseBtn from '@/components/btn/BaseBtn'
import { createWorks, loginSchema } from '@/utils/validations'
import { FormLabel } from '@/components/textBlock/FormLabel'
import BaseInput from '@/components/input/BaseInput'

type CreateWorks = {
  status: number
  title: string
  titleEn: string
  archiveImg: unknown
  useTools: number[]
  comment?: string
  url?: string
  role?: string
  singleImgMain: unknown
  singleImgSub1?: unknown
  singleImgSub2?: unknown
  gitUrl?: string
}

type Props = {
  formType: 'create' | 'edit'
  defaultValues?: {}
}

export const CreateForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorks>({
    mode: 'onBlur',
    // defaultValues,
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
        <div className="ml-[.4em] mt-[.2em]">{/* radio_btn */}</div>
      </FormLabel>

      <FormLabel
        label="タイトル"
        required
        errorMessage={errors?.title?.message}
      >
        <div className="ml-[.4em] mt-[.2em]">
          <BaseInput
            type="text"
            placeholder="タイトル"
            {...register('title')}
          />
        </div>
      </FormLabel>

      <FormLabel
        label="英文字タイトル"
        required
        errorMessage={errors?.titleEn?.message}
      >
        <div className="ml-[.4em] mt-[.2em]">
          <BaseInput type="text" placeholder="title" {...register('titleEn')} />
        </div>
      </FormLabel>

      <FormLabel
        label="アーカイブ画像"
        required
        errorMessage={errors?.archiveImg?.message}
      >
        <div className="ml-[.4em] mt-[.2em]">{/* 画像アップロード */}</div>
      </FormLabel>

      <FormLabel
        label="アーカイブ画像"
        required
        errorMessage={errors?.archiveImg?.message}
      >
        <div className="ml-[.4em] mt-[.2em]">{/* 画像アップロード */}</div>
      </FormLabel>

      <FormLabel
        label="使用ツール"
        required
        errorMessage={errors?.useTools?.message}
      >
        <div className="ml-[.4em] mt-[.2em]">
          {/*　使用ツール　チェックボックス　*/}
        </div>
      </FormLabel>

      <FormLabel label="コメント" errorMessage={errors?.useTools?.message}>
        <div className="ml-[.4em] mt-[.2em]">
          {/*　コメント　テキストエリア　*/}
        </div>
      </FormLabel>

      <FormLabel label="url" errorMessage={errors?.url?.message}>
        <div className="ml-[.4em] mt-[.2em]">
          <BaseInput type="url" placeholder="http://" {...register('url')} />
        </div>
      </FormLabel>

      <FormLabel label="role" required errorMessage={errors?.role?.message}>
        <div className="ml-[.4em] mt-[.2em]">
          <BaseInput type="url" placeholder="http://" {...register('role')} />
        </div>
      </FormLabel>

      <FormLabel label="git_url" errorMessage={errors?.gitUrl?.message}>
        <div className="ml-[.4em] mt-[.2em]">
          <BaseInput type="url" placeholder="http://" {...register('gitUrl')} />
        </div>
      </FormLabel>
      <div className="flex-center mt-[2em]">
        <BaseBtn
          btnColor="primary"
          btnProps={{
            type: 'submit',
          }}
        >
          保存
        </BaseBtn>
      </div>
    </form>
  )
}
