import { cn } from '@/lib/utils'
import React from 'react'

type HeadingProps = {
  level?: 1 | 2 | 3
  children: React.ReactNode
  className?: string
}

export function Heading({ level = 1, children, className }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  return (
    <Tag
      className={cn(
        level === 1 && 'text-3xl font-bold',
        level === 2 && 'text-2xl font-semibold',
        level === 3 && 'text-xl font-medium',
        className
      )}
    >
      {children}
    </Tag>
  )
} 