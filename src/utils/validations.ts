import * as yup from 'yup'

const ENTER_TEXT = 'を入力してください'
const SELECT_TEXT = 'を選択してください'

const requiredMessage = (title: string, type: 'input' | 'select' = 'input') => {
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
    .email('無効なメールアドレスです')
    .required(requiredMessage('メールアドレス')),
  password: yup.string().required(requiredMessage('パスワード')),
})

// const toolSchema = yup.object().shape({
//   id: yup.number().required(),
//   toolName: yup.string().required(),
// })

export const createToolSchema = yup.object({
  toolName: yup.string().required(requiredMessage('ツール名')),
})

export const createWorks = yup.object({
  order: yup
    .number()
    .typeError('数字で入力してください')
    .integer('整数で入力してください')
    .min(1 ,'1以上で入力してください' )
    .max(9007199254740991,'最大値を超えています')
    .required(requiredMessage('並び順', 'select')),
  permission: yup
    .number()
    .typeError(requiredMessage('表示権限', 'select'))
    .required(requiredMessage('表示権限', 'select')),
  publication: yup
    .number()
    .typeError(requiredMessage('公開状況', 'select'))
    .required(requiredMessage('公開状況', 'select')),
  title: yup.string().required(requiredMessage('タイトル')),
  titleEn: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, '英数字のみを入力してください')
    .required(requiredMessage('英文字タイトル')),
  archiveImg: yup.string().required(requiredMessage('一覧画像')),
  useTools: yup
    .array()
    // .of(toolSchema)
    .min(1, requiredMessage('使用ツール', 'select'))
    .required(requiredMessage('使用ツール', 'select')),
  comment: yup.string().nullable(),
  url: yup.string().url('url形式で入力してください').nullable(),
  gitUrl: yup.string().url('url形式で入力してください').nullable(),
  role: yup.string().required(requiredMessage('役割')),
  singleImgMain: yup.string().required(requiredMessage('詳細ページメイン画像')),
  singleImgSub: yup.string().required(requiredMessage('詳細ページサブ画像')),
  singleImgSub2: yup.string().nullable(),
})

export const createUserSchema = yup.object({
  email: yup.string().email('無効なメールアドレスです').required(requiredMessage('メールアドレス')),
  password: yup.string().min(5).required(requiredMessage('パスワード')),
  permissions: yup
    .number()
    .typeError(requiredMessage('権限', 'select'))
    .required(requiredMessage('権限', 'select')),
})
