'use client'
import { AuthForm } from '@/components/organism/form/AuthForm'
import { useLogin } from '../hooks/useLogin'

export const LoginForm = () => {
  const { isLoadingLogin, isErrorLogin, errorMessage, onSubmitLogin } =
    useLogin()

  return (
    <AuthForm
      handlerSubmit={onSubmitLogin}
      isError={isErrorLogin}
      formType="login"
      errorMessage={errorMessage}
      isLoading={isLoadingLogin}
    />
  )
}
