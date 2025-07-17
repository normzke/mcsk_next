import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'

export function Spinner({ className = '' }: { className?: string }) {
  return <Icons.spinner className={cn('animate-spin', className)} />
} 