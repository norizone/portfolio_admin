'use client'
import { DeleteIcon } from '@/components/icon/DeleteIcon'
import { EditIcon } from '@/components/icon/EditIcon'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const works = [
  {
    title: '制作1',
    id: 1,
  },
  {
    title: '制作2',
    id: 2,
  },
  {
    title: '制作3',
    id: 3,
  },
  {
    title: '制作4',
    id: 4,
  },
]

const tableData = [
  {
    tableHeader: 'ID',
    tableKey: 'id',
    text: '1',
    width: 1 / 10,
  },
  {
    tableHeader: '並び順',
    tableKey: 'layoutNumber',
    text: '0',
    width: 1 / 10,
  },
  {
    tableHeader: 'タイトル',
    tableKey: 'title',
    text: 'dfjpadipsqojwjfpwoqfjpwojfiopwqfsapifpdsojafpsajfpsapfjpsajfpa',
    width: 4 / 10,
  },
  {
    tableHeader: '公開状況',
    tableKey: 'updateAt',
    text: '非公開',
    width: 2 / 10,
  },
  {
    tableHeader: '編集',
    tableKey: 'layoutNumber',
    onEdit: true,
  },
  {
    tableHeader: '削除',
    tableKey: 'layoutNumber',
    onDelete: true,
  },
]

const tableColMargin = 'p-[.6em]'

export const BaseTable = () => {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr className="bg-active transition-all shadow-sm rounded-md">
          {tableData.map((table, index) => (
            <th
              style={{
                width: `${table.width ? `${table.width * 100}%` : '1em'}`,
              }}
              className={`border-r border-border-op last-of-type:border-none ${tableColMargin} font-normal`}
              key={index}
            >
              {table.tableHeader}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white  shadow-sm rounded-md p-[1em] border-t border-border-op">
          {tableData.map((table, index) => (
            <td
              key={index}
              className={twMerge(
                'text-center border-r border-border-op last-of-type:border-none font-normal',
                clsx(
                  table.onEdit &&
                    'hover:bg-hover transition-all fill-base-text hover:fill-primary',
                  table.onDelete &&
                    'hover:bg-hover-alert transition-all fill-base-text hover:fill-error'
                )
              )}
            >
              {table.onEdit ? (
                <button
                  className={`w-full ${tableColMargin} flex-center`}
                  type="button"
                  // onClick={() => {}}
                >
                  <EditIcon />
                </button>
              ) : table.onDelete ? (
                <button
                  className={`w-full ${tableColMargin} flex-center`}
                  type="button"
                  // onClick={() => {}}
                >
                  <DeleteIcon />
                </button>
              ) : (
                <span className={`truncate block ${tableColMargin}`}>
                  {table.text}
                </span>
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}
