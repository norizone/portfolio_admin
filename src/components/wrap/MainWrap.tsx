import { ReactNode } from 'react'
import { SideBar } from '../sidebar/PrimarySidebar'
import { PrimaryHeader } from '../header/PrimaryHeader'

type Props = {
  children: ReactNode
}

export const MainWrap = (props: Props) => {
  const { children } = props
  return (
    <div className="w-full flex flex-row flex-nowrap">
      <SideBar />
      <div className="max-w-[900px] p-[2em] mx-auto w-full">
        <PrimaryHeader />
        {children}
      </div>
    </div>
  )
}
