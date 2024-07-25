import { PUBLICATION_STATUS, USER_ROLE, VIEW_PERMISSION } from './enum'

export const convertPublication: Record<PUBLICATION_STATUS, string> = {
  [PUBLICATION_STATUS.PUBLIC]: '公開',
  [PUBLICATION_STATUS.PRIVATE]: '非公開',
}

export const convertViewPermission: Record<VIEW_PERMISSION, string> = {
  [VIEW_PERMISSION.GUEST]: '未ログイン',
  [VIEW_PERMISSION.LIMIT]: 'ログイン&制限ありアカウント',
  [VIEW_PERMISSION.ALL]: 'ログイン&制限なしアカウント',
}

export const convertUserRole: Record<USER_ROLE, string> = {
  [USER_ROLE.LIMIT_VIEWING]: '制限付きユーザー',
  [USER_ROLE.ALL_VIEWING]: '制限なしユーザー',
}
