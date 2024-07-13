'use client'
import Link from 'next/link'
import { LogoIcon } from '@/components/elements/icon/LogoIcon'
import { UserIcon } from '@/components/elements/icon/UserIcon'
import { routers } from '@/routers/routers'
import { WorksIcon } from '@/components/elements/icon/WorksIcon'
import { SettingIcon } from '@/components/elements/icon/SettingIcon'
import { LogoutIcon } from '@/components/elements/icon/LogoutIcon'
import { HomeIcon } from '@/components/elements/icon/HomeIcon'
import { LogoutModal } from '@/components/elements/modal/LogoutModal'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import { useRouter, usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import { useCompleteModal } from '@/hooks/ui/useCompleteModal'
import { useLogoutModal } from '@/hooks/ui/useLogoutModal'

const MENU_LIST = [
  {
    title: '管理者情報',
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
    title: 'ツール管理',
    url: routers.TOOL,
    icon: <SettingIcon />,
    chilled: [{ title: '', url: '' }],
  },
]

const xWrap = 'px-[2em]'

export const SideBar = () => {
  const {
    completeMessage,
    setCompleteMessage,
    isOpenCompleteModal,
    toggleCompleteModal,
  } = useCompleteModal()
  const {
    onLogout,
    isOpenLogoutModal,
    toggleLogoutModal,
    isLoadingLogout,
    isErrorLogout,
    errorMessage,
  } = useLogoutModal(setCompleteMessage, toggleCompleteModal)

  const router = useRouter()

  const onCloseCompleteModal = () => {
    toggleCompleteModal()
    router.replace(routers.LOGIN)
  }
  const pathname = usePathname()
  const parentPath = `/${pathname.split('/')[1] ?? ''}`

  return (
    <>
      <nav className="w-[300px] bg-white min-h-[100vh] border-l shadow-xl">
        <div className="sticky top-0  py-[1em]">
          <div className="w-[40%] mx-auto py-[1em] mb-[1em]">
            <LogoIcon />
          </div>

          <div className={`bg-background ${xWrap} mb-[2em] py-[1em] mt-[.5em]`}>
            <button
              className="fill-black hover:fill-primary transition-all flex flex-row items-center w-max mx-auto gap-[1em]"
              type="button"
              onClick={toggleLogoutModal}
            >
              <p>ログアウト</p>
              <LogoutIcon />
            </button>
          </div>

          <ul className={`h-max overflow-auto flex flex-col`}>
            {MENU_LIST.map((menu, index) => (
              <li className="" key={index}>
                <Link
                  href={menu.url}
                  className={twMerge(
                    `${xWrap} py-[.5em] grid grid-cols-[1em_1fr] gap-x-[2em] fill-black hover:fill-primary transition-all bg-transparent hover:bg-hover`,
                    clsx(
                      menu.url === parentPath && 'fill-primary bg-hover',
                      menu.url === pathname && 'cursor-default',
                    ),
                  )}
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
        isLoading={isLoadingLogout}
        isOpen={isOpenLogoutModal}
        handleToggleModal={toggleLogoutModal}
        onSubmit={onLogout}
        isError={isErrorLogout}
        errorMessage={errorMessage}
      />
      <CompleteModal
        isOpen={isOpenCompleteModal}
        handleToggleModal={onCloseCompleteModal}
        isOnlyBtn={true}
        completeText={completeMessage}
      />
    </>
  )
}
