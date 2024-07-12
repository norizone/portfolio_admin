import { useMutateSignUp } from '@/hooks/api/admin.hooks'
import { routers } from '@/routers/routers'
import { LoginBody } from '@/types/api/admin'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useSignUp = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    mutate: mutateSignUp,
    isPending: isLoadingSignUp,
    isError: isErrorSignUp,
  } = useMutateSignUp()

  const onSubmitSignUp = (data: LoginBody) => {
    mutateSignUp(data, {
      onSuccess: () => {
        router.replace(routers.LOGIN)
      },
      onError: (res) => {
        console.log(res)
        setErrorMessage(res?.message)
      },
    })
  }

  return {
    isLoadingSignUp,
    isErrorSignUp,
    errorMessage,
    onSubmitSignUp,
  }
}
