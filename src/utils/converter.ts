import { PUBLICATION_STATUS } from './enum'

export const convertPublication: Record<PUBLICATION_STATUS, string> = {
  [PUBLICATION_STATUS.PUBLIC]: '公開',
  [PUBLICATION_STATUS.PRIVATE]: '非公開',
};