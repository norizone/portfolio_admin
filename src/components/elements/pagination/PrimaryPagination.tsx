import clsx from 'clsx'
import { ReactNode, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  totalPage: number
  currentPage: number
  onClick: (e: number) => void
}

type ListBlockProps = {
  blockNumber: number
  children: ReactNode
  onClick: (e: number) => void
  current?: boolean
  ariaLabel?: string
  hidden?: boolean
}
const MAX_PAGINATION = 5

const RenderListBlock = ({
  blockNumber,
  children,
  onClick,
  current,
  ariaLabel,
  hidden,
}: ListBlockProps) => {
  return (
    <li
      className={twMerge(
        'w-[2em] aspect-square border border-border text-center font-en flex-center',
        clsx(
          current ? 'bg-active' : 'hover:bg-hover transition-all',
          hidden && 'invisible'
        )
      )}
    >
      <button
        type="button"
        className="w-full h-full flex-center"
        aria-label={ariaLabel}
        disabled={current}
        onClick={() => onClick(blockNumber)}
      >
        {children}
      </button>
    </li>
  )
}

export const PrimaryPagination = (props: Props) => {
  const { totalPage = 20, currentPage = 5, onClick } = props
  const [pageArray, setPageArray] = useState<Array<number>>([])

  useMemo(() => {
    if (totalPage >= 5) {
      const startingCount =
        currentPage < 3
          ? 1
          : totalPage - 5 < currentPage
          ? totalPage - 4
          : currentPage - 2

      const pages = [...Array(MAX_PAGINATION).keys()].map(
        (i) => i + startingCount
      )
      setPageArray(pages)
    } else {
      const pages = [...Array(totalPage).keys()].map((i) => i + 1)
      setPageArray(pages)
    }
  }, [totalPage, currentPage])

  return totalPage === 1 ? null : (
    <nav aria-label="ページネーション">
      <ul className="flex flex-row flex-nowrap gap-[.4em] w-max mx-auto">
        <RenderListBlock
          ariaLabel={'最初のページへ'}
          blockNumber={1}
          onClick={onClick}
          hidden={1 === currentPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="fill-fc"
          >
            <path d="M459-279 258-480l201-201 18.5 18.5L295-480l182.5 182.5L459-279Zm224.5 0-201-201 201-201 18.5 18.5L519.5-480 702-297.5 683.5-279Z" />
          </svg>
        </RenderListBlock>
        {pageArray.map((pIndex) => (
          <RenderListBlock
            onClick={onClick}
            ariaLabel={`${pIndex}ページ目へ`}
            key={pIndex}
            current={pIndex === currentPage}
            blockNumber={pIndex}
          >
            {pIndex}
          </RenderListBlock>
        ))}
        <RenderListBlock
          ariaLabel={'最後のページへ'}
          blockNumber={totalPage}
          onClick={onClick}
          hidden={totalPage === currentPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="fill-fc"
          >
            <path d="M441-480 258-662.5l18.5-18.5 201 201-201 201-18.5-18.5L441-480Zm224.5 0-183-182.5L501-681l201 201-201 201-18.5-18.5 183-182.5Z" />
          </svg>
        </RenderListBlock>
      </ul>
    </nav>
  )
}
