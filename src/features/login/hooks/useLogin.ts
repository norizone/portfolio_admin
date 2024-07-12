import { useMutateLogin } from '@/hooks/api/admin.hooks'
import { routers } from '@/routers/routers'
import { LoginBody } from '@/types/api/admin'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useLogin = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    mutate: mutateLogin,
    isPending: isLoadingLogin,
    isError: isErrorLogin,
  } = useMutateLogin()

  const onSubmitLogin = (data: LoginBody) => {
    mutateLogin(data, {
      onSuccess: () => {
        router.replace(routers.DASHBOARD)
      },
      onError: (res) => {
        console.log(res)
        setErrorMessage(res?.message)
      },
    })
  }

  return {
    isLoadingLogin,
    isErrorLogin,
    errorMessage,
    onSubmitLogin,
  }
}
