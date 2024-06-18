'use client'
import { twMerge } from 'tailwind-merge'
import { PrimaryTableProps } from './type'

const PrimaryTable = <T,>(props: PrimaryTableProps<T>) => {
  const { loading, data, columns, className, getRowId, onRowClick } = props

  const tHead = () => (
    <thead>
      <tr className="bg-active transition-all shadow-sm rounded-md p-0">
        {columns.map((col, index) => (
          <th
            style={{
              width: `${
                ((col?.width ? col.width : 1) / columns.length) * 100
              }%`,
            }}
            className={`border-r border-border-op last-of-type:border-none font-normal`}
            key={index}
          >
            <span className={twMerge('block')}>{col.header}</span>
          </th>
        ))}
      </tr>
    </thead>
  )

  const tBody = () => {
    return (
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={`row-${rowIndex}`}
            className="bg-white  shadow-sm rounded-md border-t border-border-op"
          >
            {columns.map((col, colIndex) => {
              const colValue = col?.converter
                ? col?.converter(row)
                : col.key !== 'action'
                ? (row[col.key] as string)
                : ''
              return (
                <td
                  key={`col-${colIndex}`}
                  className="text-center border-r border-border-op last-of-type:border-none font-normal p-0"
                >
                  {col.renderCell ? (
                    col.renderCell(row)
                  ) : (
                    <span className={twMerge(`truncate block`)}>
                      {colValue}
                    </span>
                  )}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    )
  }

  return (
    <table className="w-full table-fixed">
      {tHead()}
      {tBody()}
    </table>
  )
}

export default PrimaryTable
