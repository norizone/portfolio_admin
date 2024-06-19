'use client'
import Link from 'next/link'
import { LogoIcon } from '../icon/LogoIcon'
import { UserIcon } from '../icon/UserIcon'
import { routers } from '@/routers/routers'
import { WorksIcon } from '../icon/WorksIcon'
import { SettingIcon } from '../icon/SettingIcon'
import { LogoutIcon } from '../icon/LogoutIcon'
import { HomeIcon } from '../icon/HomeIcon'
import { useState } from 'react'
import { useFixBody } from '@/hooks/useFixeBody'
import { LogoutModal } from '../modal/LogoutModal'

const MENU_LIST = [
  {
    title: 'ダッシュボード',
    url: routers.DASHBOARD,
    icon: <HomeIcon />,
    chilled: [{ title: '', url: '' }],
  },
  {
    title: '制作実績',
    url: routers.WORKS,
    icon: <WorksIcon />,
    chilled: [{ title: '', url: '' }],
  },
  {
    title: 'ユーザー管理',
    url: routers.USER_MANAGEMENT,
    icon: <UserIcon />,
    chilled: [{ title: '', url: '' }],
  },
  {
    title: '管理者設定',
    url: routers.ADMIN_SETTING,
    icon: <SettingIcon />,
    chilled: [{ title: '', url: '' }],
  },
]

export const SideBar = () => {
  const xWrap = 'px-[2em]'
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const { fixBody, unfixedBody } = useFixBody()
  const handleOpenModal = () => {
    isOpenModal ? unfixedBody() : fixBody()
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <nav className="w-[300px] bg-white min-h-[100vh] border-l shadow-xl">
        <div className="sticky top-0  py-[1em]">
          <div className="w-[40%] mx-auto py-[1em] mb-[1em]">
            <LogoIcon />
          </div>

          <div className={`bg-background ${xWrap} mb-[2em] pt-[2em]`}>
            <div className="w-[60px] mx-auto aspect-square rounded-full overflow-hidden">
              <span className="w-full h-full bg-red-500 block"></span>
            </div>
            <div className="flex flex-row items-center pb-[1em] mt-[.5em] w-max mx-auto gap-2">
              <p className="">userMame</p>
              <button
                className="fill-black hover:fill-primary transition-all"
                type="button"
                aria-label="ログアウト"
                onClick={handleOpenModal}
              >
                <LogoutIcon />
              </button>
            </div>
          </div>

          <ul className={`h-max overflow-auto flex flex-col`}>
            {MENU_LIST.map((menu, index) => (
              <li className="" key={index}>
                <Link
                  href={menu.url}
                  className={`${xWrap} py-[.5em] grid grid-cols-[1em_1fr] gap-x-[2em] fill-black hover:fill-primary transition-all bg-transparent hover:bg-hover`}
                >
                  <span>{menu.icon}</span>
                  <span>{menu.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <LogoutModal
        isOpen={isOpenModal}
        handleToggleModal={handleOpenModal}
        onSubmit={() => {}}
      />
    </>
  )
}
