import { ToolData, UpdateOrderTool } from '@/types/api/admin'
import { DragOverEvent } from '@dnd-kit/core'
import { useMutateUpdateOrderTool } from '@/hooks/api/admin.hooks'

export const useEditOrderTool = (data?: ToolData[]) => {
  const {
    mutate,
    isPending: isLoadingOrder,
    isError: isErrorOrder,
  } = useMutateUpdateOrderTool()
  const onEditOrder = (event: DragOverEvent) => {
    if (!data || data.length === 0) return
    const activeId = Number(event.active.id)
    const validActiveId = isNaN(activeId) ? null : activeId
    const overId = event.over?.id

    const movedOrder = data.find((item) => item.id === overId)
    if (!movedOrder || validActiveId === null) return

    const newData: UpdateOrderTool = {
      id: validActiveId,
      order: movedOrder.order,
    }
    mutate(newData)
  }

  return {
    onEditOrder,
    isLoadingOrder,
    isErrorOrder,
  }
}
