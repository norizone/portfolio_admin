import { ReactNode } from 'react'
import { SideBar } from '../../elements/sidebar/PrimarySidebar'
import { PrimaryHeader } from '../header/PrimaryHeader'

type Props = {
  children: ReactNode
}

export const MainWrap = (props: Props) => {
  const { children } = props
  return (
    <div className="w-full flex flex-row flex-nowrap">
      <SideBar />
      <div className="p-[2em] mt-[2em] mx-auto w-full">{children}</div>
    </div>
  )
}
