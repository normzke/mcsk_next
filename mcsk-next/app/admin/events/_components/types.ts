export interface Event {
  id: string
  title: string
  description: string
  date: Date
  location?: string | null
  image?: string | null
  createdAt: Date
  updatedAt: Date
  isActive: boolean
} 