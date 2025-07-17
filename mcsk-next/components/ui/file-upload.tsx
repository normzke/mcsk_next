'use client'

import { useCallback } from 'react'
import { FileIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileUploadProps {
  value: string | null
  onChange: (value: string | null) => void
  onRemove: () => void
  accept?: string
}

export function FileUpload({
  value,
  onChange,
  onRemove,
  accept = '*/*'
}: FileUploadProps) {
  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Here you would typically upload to your storage service
    // For now, we'll create a local URL
    const reader = new FileReader()
    reader.onloadend = () => {
      onChange(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [onChange])

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-full h-32 rounded-md border border-dashed flex items-center justify-center">
        <input
          type="file"
          accept={accept}
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleUpload}
        />
        {value ? (
          <div className="flex items-center gap-2 p-2">
            <FileIcon className="h-8 w-8 text-blue-500" />
            <div className="flex-1">
              <p className="text-sm font-medium">File uploaded</p>
              <p className="text-xs text-gray-500">Click to replace</p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onRemove()
              }}
              className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <FileIcon className="h-10 w-10 text-gray-400" />
            <span className="text-sm text-gray-500">Upload File</span>
          </div>
        )}
      </div>
    </div>
  )
} 