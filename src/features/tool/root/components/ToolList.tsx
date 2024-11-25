'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import PrimaryTable from '@/components/elements/table/PrimaryTable'
import { DeleteBtn } from '@/components/elements/btn/DeleteBtn'
import { ColumnsType } from '@/components/elements/table/PrimaryTable/type'
import { styleTableTRPadding } from '@/styles/style'
import BaseInput from '@/components/elements/input/BaseInput'
import { EditTool, ToolData } from '@/types/api/admin'
import { DragBtn } from '@/components/elements/btn/DragBtn'
import { useEditOrderTool } from '../hooks/useEditOrderTool'

type Props = {
  toolItems?: ToolData[]
  isEditMode?: boolean
  isLoading?: boolean
  onClickDelete: (id: number, title: string) => void
  setEditData: (value: EditTool[]) => void
  editData: EditTool[]
}

export const ToolList = (props: Props) => {
  const {
    toolItems,
    isEditMode,
    isLoading,
    onClickDelete,
    setEditData,
    editData,
  } = props

  const [firstRow, setFirstRow] = useState(0)
  const firstRowInput = useRef<HTMLInputElement | null>(null)
  const { onEditOrder } = useEditOrderTool(toolItems)

  useMemo(() => {
    if (!toolItems || toolItems.length === 0) return setFirstRow(0)
    setFirstRow(toolItems[0].id)
  }, [toolItems])

  useEffect(() => {
    if (!isEditMode) return
    firstRowInput.current?.focus()
  }, [isEditMode])

  const onEditToolName = (editTool: EditTool) => {
    const updatedData = editData.some((tool) => tool.id === editTool.id)
      ? editData.map((tool) =>
        tool.id === editTool.id
          ? { ...tool, toolName: editTool.toolName }
          : tool,
      )
      : [...editData, editTool]

    setEditData(updatedData)
  }

  const tableColumns: ColumnsType<ToolData>[] = [
    {
      header: '',
      key: 'drag',
      width: 0.5,
      tBodyTDClassName: isEditMode ? 'hidden' : '',
      tHeaderTHClassName: isEditMode ? 'hidden' : '',
      renderCell: (row) => (
        <DragBtn
          customClassName={styleTableTRPadding}
          disabled={isEditMode}
        />
      ),
    },
    {
      header: 'ID',
      key: 'id',
    },
    {
      header: 'タイトル',
      key: 'toolName',
      width: 8,
      tHeaderTHClassName: styleTableTRPadding,
      tBodyTDClassName: `text-left px-[1em]`,
      renderCell: (row) => {
        const isFirstRow = firstRow === row.id
        return isEditMode ? (
          <BaseInput
            type="input"
            defaultValue={row.toolName}
            inputClassName={`w-full h-full bg-transparent ${styleTableTRPadding}`}
            name={`toolName${row.id}`}
            onChange={(e) =>
              onEditToolName({ id: row.id, toolName: e.target.value })
            }
            ref={isFirstRow ? firstRowInput : null}
          />
        ) : (
          <>{row.toolName}</>
        )
      },
    },
    {
      header: '削除',
      key: 'action',
      tBodyTDClassName: isEditMode ? 'hidden' : '',
      tHeaderTHClassName: isEditMode ? 'hidden' : '',
      renderCell: (row) => (
        <DeleteBtn
          customClassName={styleTableTRPadding}
          onClick={() => {
            onClickDelete(row.id, row.toolName)
          }}
          disabled={isEditMode}
        />
      ),
    },
  ]

  return (
    <>
      <div className="mt-[2em] relative">
        <PrimaryTable
          columns={tableColumns}
          isLoading={isLoading}
          data={toolItems}
          handleDragEnd={onEditOrder}
        />
      </div>
    </>
  )
}
