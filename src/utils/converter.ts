import { PUBLICATION_STATUS } from './enum'

export const converterPublication = (status: PUBLICATION_STATUS): string => {
  switch (status) {
    case PUBLICATION_STATUS.PUBLIC:
      return '公開'
    case PUBLICATION_STATUS.PRIVATE:
      return '非公開'
    default:
      return ''
  }
}
