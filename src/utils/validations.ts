import * as yup from 'yup'

const ENTER_TEXT = 'を入力してください'

const requiredMessage = (title: string) => `${title}${ENTER_TEXT}`

export const loginSchema = yup.object({
  email: yup
    .string()
    .required(requiredMessage('メールアドレス'))
    .matches(
      /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
      '無効なメールアドレスです'
    ),
  password: yup.string().required(requiredMessage('パスワード')),
})

export const createWorks = yup.object({
  status: yup.number().required(requiredMessage('公開状況')),
  title: yup.string().required(requiredMessage('タイトル')),
  titleEn: yup.string().required(requiredMessage('英文字タイトル')),
  archiveImg: yup.string().required(requiredMessage('アーカイブ画像')),
  // useTools: number[]
  // comment?: string
  // url?: string
  // role?: string
  // singleImgMain: unknown
  // singleImgSub1?: unknown
  // singleImgSub2?: unknown
  // gitUrl?: string
})

export const createUser = yup.object({
  name: yup.string().required(requiredMessage('ユーザー名')),
  permissions: yup.number().required(requiredMessage('権限')),
})
