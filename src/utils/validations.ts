import * as yup from 'yup'

const ENTER_TEXT = 'を入力してください'
const SELECT_TEXT = 'を選択してください'

const requiredMessage = (title: string , type:'input'|'select' = 'input') => {
  switch (type) {
    case 'input':
      return `${title}${ENTER_TEXT}`
    case 'select':
      return `${title}${SELECT_TEXT}`
    default:
      return `${title}${ENTER_TEXT}`
  }
}

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
  status: yup.number().typeError(requiredMessage('表示権限','select')).required(requiredMessage('公開状況','select')),
  title: yup.string().required(requiredMessage('タイトル')),
  titleEn: yup.string().matches(/^[a-zA-Z0-9]*$/, '英数字のみを入力してください').required(requiredMessage('英文字タイトル')),
  archiveImg: yup.string().required(requiredMessage('アーカイブ画像')),
  permission:yup.number().typeError(requiredMessage('表示権限','select')).required(requiredMessage('表示権限','select')),
  useTools : yup.array().min(1,requiredMessage('使用ツール','select')),
  comment: yup.string(),
  url: yup.string().url('url形式で入力してください'),
  role: yup.string().required(requiredMessage('役割')),
  gitUrl: yup.string().url('url形式で入力してください'),
  // singleImgMain: unknown
  // singleImgSub1?: unknown
  // singleImgSub2?: unknown
  
})

export const createUser = yup.object({
  name: yup.string().required(requiredMessage('ユーザー名')),
  permissions: yup.number().required(requiredMessage('権限')),
})
