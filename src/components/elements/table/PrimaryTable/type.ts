export type ColumnsType<T> = {
  key: keyof T | 'action'
  header: string
  width?: number
  disableCellClick?: boolean
  renderCell?: (row: T) => JSX.Element
  converter?: (row: T) => string
  preventKeys?: string[]
  tHeaderTHClassName?: string
  tBodyTDClassName?: string
}

export type PrimaryTableProps<T> = {
  isLoading?: boolean
  data?: T[]
  theadTRClassName?: string
  tBodyTRClassName?: string
  columns: ColumnsType<T>[]
  className?: string
  getRowId?: (data: T) => void
  onRowClick?: (data: T) => void
}
