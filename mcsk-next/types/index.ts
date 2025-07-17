export interface Event {
  id: string
  title: string
  description: string
  venue: string
  startDate: string
  endDate: string | null
  featuredImage: string
  ticketPrice: number | null
  ticketUrl: string | null
  capacity: number | null
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  createdAt: string
} 