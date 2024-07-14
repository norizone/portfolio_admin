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

/**
 * image_file
 */
export const fileSchema = yup
  .mixed<File>()
  .test({
    name: 'format',
    message: 'ファイルは png、jpg、jpeg 形式のみを対応しています。',
    test(file: unknown) {
      if (file && file instanceof File) {
        const supportedFormats = ['image/jpeg', 'image/png', 'image/jpg']
        return supportedFormats.includes(file.type)
      }
      return true
    },
  })
  .test({
    name: 'size',
    message: 'ファイルサイズは2.5MBを超えることはできません。',
    test(file: unknown) {
      if (file && file instanceof File) {
        return file.size <= 2.5 * 1024 * 1024
      }
      return true
    },
  })

/**
 * tool フォーム
 */
export const createToolSchema = yup.object({
  toolName: yup.string().required(requiredMessage('ツール名')),
})

/**
 * works フォーム
 */
export const createEditWorks = yup.object({
  permission: yup.string().required(requiredMessage('表示権限', 'select')),
  publication: yup.string().required(requiredMessage('公開状況', 'select')),
  title: yup.string().required(requiredMessage('タイトル')),
  titleEn: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, '英数字のみを入力してください')
    .required(requiredMessage('英文字タイトル')),

  useTools: yup
    .array()
    .min(1, requiredMessage('使用ツール', 'select'))
    .required(requiredMessage('使用ツール', 'select')),
  comment: yup.string().nullable(),
  url: yup.string().url('url形式で入力してください').nullable(),
  gitUrl: yup.string().url('url形式で入力してください').nullable(),
  role: yup.string().required(requiredMessage('役割')),

  uploadArchiveImg: fileSchema.nullable(),
  uploadSingleImgMain: fileSchema.nullable(),
  uploadSingleImgSub: fileSchema.nullable(),
  uploadSingleImgSub2: fileSchema.nullable(),

  archiveImg: yup.string().required(requiredMessage('一覧画像')),
  singleImgMain: yup.string().required(requiredMessage('詳細ページメイン画像')),
  singleImgSub: yup.string().required(requiredMessage('詳細ページサブ画像')),
  singleImgSub2: yup.string().nullable(),
})

/**
 * userフォーム
 */
export const createUserSchema = yup.object({
  email: yup
    .string()
    .email('無効なメールアドレスです')
    .required(requiredMessage('メールアドレス')),
  password: yup
    .string()
    .required(requiredMessage('パスワード'))
    .min(5, '５文字以上入力してください'),
  permission: yup
    .number()
    .typeError(requiredMessage('権限', 'select'))
    .required(requiredMessage('権限', 'select')),
})

/**
 * loginフォーム
 */
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('無効なメールアドレスです')
    .required(requiredMessage('メールアドレス')),
  password: yup.string().required(requiredMessage('パスワード')),
})
