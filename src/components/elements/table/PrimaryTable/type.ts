import { DragOverEvent } from '@dnd-kit/core'

export type ColumnsType<T extends { id: number }> = {
  key: keyof T | 'action' | 'drag'
  header: string
  width?: number
  disableCellClick?: boolean
  renderCell?: (row: T) => JSX.Element
  converter?: (row: T) => string
  preventKeys?: string[]
  tHeaderTHClassName?: string
  tBodyTDClassName?: string
}

export type PrimaryTableProps<T extends { id: number }> = {
  isLoading?: boolean
  data?: T[]
  theadTRClassName?: string
  tBodyTRClassName?: string
  columns: ColumnsType<T>[]
  className?: string
  isDrag?: boolean
  handleDragEnd?: (event: DragOverEvent) => void
}

export type PrimaryTableRowProps<T extends { id: number }> = {
  columns: ColumnsType<T>[]
  tBodyTRClassName?: string
  rowData: T
}
