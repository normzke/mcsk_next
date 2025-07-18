import { cn } from '@/lib/utils'
import React from 'react'

interface HeadingPropsBase {
  level?: 1 | 2 | 3
  className?: string
}

// Two possible prop shapes: either pass children directly or use title/description strings
export type HeadingProps =
  | (HeadingPropsBase & {
      children: React.ReactNode
      title?: never
      description?: never
    })
  | (HeadingPropsBase & {
      children?: never
      title: string
      description?: string | null
    })

export function Heading(props: HeadingProps) {
  const { level = 1, className } = props as HeadingPropsBase
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  // Determine content to render
  let content: React.ReactNode
  if ('title' in props) {
    content = (
      <>
        {props.title}
        {props.description && (
          <span className="block text-muted-foreground mt-1 text-sm font-normal">
            {props.description}
          </span>
        )}
      </>
    )
  } else {
    content = props.children
  }

  return (
    <Tag
      className={cn(
        level === 1 && 'text-3xl font-bold',
        level === 2 && 'text-2xl font-semibold',
        level === 3 && 'text-xl font-medium',
        className
      )}
    >
      {content}
    </Tag>
  )
}