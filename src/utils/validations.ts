import * as yup from 'yup'

const ENTER_TEXT = 'を入力してください'

export const loginSchema = yup.object({
  email: yup
    .string()
    .required(`メールアドレス${ENTER_TEXT}`)
    .matches(
      /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
      '無効なメールアドレスです'
    ),
  password: yup.string().required(`パスワード${ENTER_TEXT}`),
})
