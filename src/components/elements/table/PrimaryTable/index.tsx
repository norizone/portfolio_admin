'use client'
import { twMerge } from 'tailwind-merge'
import { PrimaryTableProps } from './type'
import { DndContext } from "@dnd-kit/core";
import { TableRow } from './TableRow'
import { SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const PrimaryTable = <T extends { id: number },>(props: PrimaryTableProps<T>) => {
  const {
    isLoading = false,
    data,
    columns,
    className,
    theadTRClassName,
    tBodyTRClassName,
    handleDragEnd
  } = props

  const tHead = () => (
    <thead>
      <tr
        className={twMerge(
          'bg-active transition-all shadow-sm rounded-md p-0',
          theadTRClassName,
        )}
      >
        {columns.map((col, index) => (
          <th
            style={{
              width: `${((col?.width ? col.width : 1) / columns.length) * 100
                }%`,
            }}
            className={twMerge(
              `border-r border-border-op last-of-type:border-none font-normal`,
              col?.tHeaderTHClassName,
            )}
            key={index}
          >
            <span className={twMerge('block')}>{col.header}</span>
          </th>
        ))}
      </tr>
    </thead>
  )

  return (
    <DndContext
      onDragEnd={handleDragEnd ? (event) => handleDragEnd(event) : undefined}
      modifiers={[restrictToVerticalAxis]}
    >
      <table className="w-full table-fixed">
        {tHead()}
        <tbody>
          {data && data?.length &&
            <SortableContext items={data}>
              {data?.map(rowData => (
                <TableRow
                  key={rowData.id}
                  rowData={rowData}
                  columns={columns}
                  tBodyTRClassName={tBodyTRClassName}
                />
              ))}
            </SortableContext>
          }
        </tbody >
      </table>
    </DndContext>
  )
}

export default PrimaryTable
