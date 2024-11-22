import { WorkListItemWithOrder, UpdateOrderWork} from '@/types/api/admin'
import { DragOverEvent } from '@dnd-kit/core'
import { useMutateUpdateOrderWork } from '@/hooks/api/admin.hooks'

export const useEditOrderWoke = (data?: WorkListItemWithOrder[]) => {
  const {
    mutate,
    isPending: isLoadingOrder,
    isError: isErrorOrder,
  } = useMutateUpdateOrderWork()
  const onEditOrder = (event: DragOverEvent) => {
    if (!data || data.length === 0) return
    const activeId = Number(event.active.id)
    const validActiveId = isNaN(activeId) ? null : activeId
    const overId = event.over?.id

    const movedOrder = data.find((item) => item.id === overId)
    if (!movedOrder || validActiveId === null) return

    const newData: UpdateOrderWork = {
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
