'use client'
import { AuthForm } from '@/components/organism/form/AuthForm'
import { useSignUp } from '../hooks/useSignUp'

export const SingUpForm = () => {
  const { isLoadingSignUp, isErrorSignUp, errorMessage, onSubmitSignUp } =
    useSignUp()

  return (
    <AuthForm
      handlerSubmit={onSubmitSignUp}
      isError={isErrorSignUp}
      formType="signUp"
      errorMessage={errorMessage}
      isLoading={isLoadingSignUp}
    />
  )
}
