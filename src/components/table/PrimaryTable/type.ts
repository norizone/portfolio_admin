export type ColumnsType<T> = {
  key: keyof T | 'action'
  header: string
  width?: number
  disableCellClick?: boolean
  renderCell?: (row: T) => JSX.Element
  converter?: (row: T) => string
  preventKeys?: string[]
}

export type PrimaryTableProps<T> = {
  loading?: boolean
  data: T[]
  columns: ColumnsType<T>[]
  className?: string
  getRowId?: (data: T) => void
  onRowClick?: (data: T) => void
}
