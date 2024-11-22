import clsx from "clsx"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  message: ReactNode,
  toastType: 'error' | 'success',
}

export const PrimaryToast = (props: Props) => {
  const { message, toastType } = props
  return (
    <div className={twMerge(
      "min-w-[300px] w-max bg-opacity-80 flex flex-row justify-between px-2 py-4 fixed bottom-[1em] right-[1em] rounded text-white",
      clsx(
        toastType === 'success' ? 'bg-success' : 'bg-error',
      )
    )}>
      <p>{message}</p>
      <button aria-label="閉じる" className="w-[24px]">
        <svg className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" >
          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
        </svg>
      </button>
    </div>
  )
}