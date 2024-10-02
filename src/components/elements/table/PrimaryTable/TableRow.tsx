'use client'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { twMerge } from "tailwind-merge";
import { PrimaryTableRowProps } from "./type";

export const TableRow = <T extends { id: number }>(props: PrimaryTableRowProps<T>) => {
  const { rowData, tBodyTRClassName, columns } = props
  const { listeners, setNodeRef, transform, setActivatorNodeRef } = useSortable({
    id: rowData.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={twMerge(
        'bg-white shadow-sm rounded-md border-t border-border-op',
        tBodyTRClassName,
      )}
    >
      {columns.map((col, colIndex) => {
        const colValue = col?.converter
          ? col?.converter(rowData)
          : (col.key !== 'action' && col.key !== 'drag')
            ? (rowData[col.key] as string)
            : ''
        return (
          <td
            key={`col-${colIndex}`}
            className={twMerge(
              'text-center border-r border-border-op last-of-type:border-none font-normal p-0',
              col?.tBodyTDClassName,
            )}
            {...(col.key === 'drag' ? { ...listeners, ref: setActivatorNodeRef } : {})}
          >
            {col.renderCell ? (
              col.renderCell(rowData)
            ) : (
              <span className={twMerge(`truncate block`)}>
                {colValue}
              </span>
            )}
          </td>
        )
      })}
    </tr>
  );
}