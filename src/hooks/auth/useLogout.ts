import { useMutationLogout } from '../api/admin.hooks'

type Props = {
  onSuccessLogout?: () => void
  onErrorLogout?: () => void
}

export const useLogout = (props: Props) => {
  const { onSuccessLogout, onErrorLogout } = props

  const {
    mutate,
    isPending: isLoadingLogout,
    isError: isErrorLogout,
  } = useMutationLogout()

  const onLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        onSuccessLogout && onSuccessLogout()
      },
      onError: () => {
        onErrorLogout && onErrorLogout()
      },
    })
  }
  return {
    onLogout,
    isLoadingLogout,
    isErrorLogout,
  }
}
