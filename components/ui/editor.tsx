'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

interface EditorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}

export const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(
  ({ value, onChange, disabled = false, placeholder = "Enter content...", className }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <Textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className="min-h-[200px] resize-none"
        />
        <div className="mt-2 text-xs text-muted-foreground">
          Basic text editor. For rich text editing, consider installing a rich text editor library like TipTap or React Quill.
        </div>
      </div>
    )
  }
)

Editor.displayName = 'Editor' 