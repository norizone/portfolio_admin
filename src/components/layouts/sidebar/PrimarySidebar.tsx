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
import { useToggleModal } from '@/hooks/useToggleModal'
import { useMutationLogout } from '@/hooks/api/admin.hooks'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import { useRouter } from 'next/navigation'

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

export const SideBar = () => {
  const xWrap = 'px-[2em]'
  const router = useRouter()
  const { mutate: mutateLogout, isPending, isError } = useMutationLogout()
  const { isOpenModal: isOpenLogoutModal, toggleModal: toggleLogoutModal } =
    useToggleModal()
  const { isOpenModal: isOpenCompleteModal, toggleModal: toggleCompleteModal } =
    useToggleModal()

  const onCloseCompleteModal = () => {
    toggleCompleteModal()
    router.replace(routers.LOGIN)
  }

  const onLogout = () => {
    // TODO:UI 成功した場合モーダル変更 errorの場合はそのままのモーダルでエラーメッセージ表示？
    mutateLogout(undefined, {
      onSuccess: () => {
        toggleLogoutModal()
        toggleCompleteModal()
      },
      onError: () => {},
    })
  }

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
        isLoading={isPending}
        isOpen={isOpenLogoutModal}
        handleToggleModal={toggleLogoutModal}
        onSubmit={onLogout}
      />
      <CompleteModal
        isOpen={isOpenCompleteModal}
        handleToggleModal={onCloseCompleteModal}
        completeText="ログアウトしました"
      />
    </>
  )
}
