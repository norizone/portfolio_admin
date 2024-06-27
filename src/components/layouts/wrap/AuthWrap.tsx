import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const AuthWrap = (props: Props) => {
  const { children } = props
  return (
    <div className="w-full flex-center h-[100dvh]">
      <div className="p-[2em] flex-center m-auto w-full">{children}</div>
    </div>
  )
}
