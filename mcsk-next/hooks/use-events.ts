import { api } from "@/lib/api"
import { Event } from "@/types"
import { useQuery } from "@tanstack/react-query"

export function useEvents() {
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: () => api.events.list(),
  })

  return { events, isLoading, error }
} 