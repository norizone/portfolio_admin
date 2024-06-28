import { ListBody } from '@/types/api/admin'

export const toolKeys = {
  all: ['tool'] as const,
  lists: () => [...toolKeys.all, 'list'] as const,
  list: (filters: string) => [...toolKeys.lists(), { filters }] as const,
  details: () => [...toolKeys.all, 'detail'] as const,
  detail: (id: number) => [...toolKeys.details(), id] as const,
}

export const workKeys = {
  all: ['work'] as const,
  lists: () => [...workKeys.all, 'list'] as const,
  list: (filters: ListBody) => [...workKeys.lists(), { filters }] as const,
  details: () => [...workKeys.all, 'detail'] as const,
  detail: (id: number) => [...workKeys.details(), id] as const,
}

export const userKeys = {
  all: ['user'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
}
