'use client'

import { useCallback } from 'react'
import { ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface ImageUploadProps {
  /** Whether the upload input is disabled */
  disabled?: boolean
  value: string | null
  onChange: (value: string | null) => void
  onRemove: () => void
}

export function ImageUpload({
  value,
  onChange,
  onRemove
}: ImageUploadProps) {
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
      <div className="relative w-[200px] h-[200px] rounded-md border border-dashed flex items-center justify-center">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleUpload}
        />
        {value ? (
          <div className="relative w-full h-full">
            <Image
              fill
              src={value}
              alt="Upload"
              className="object-cover rounded-md"
            />
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onRemove()
              }}
              className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="h-10 w-10 text-gray-400" />
            <span className="text-sm text-gray-500">Upload Image</span>
          </div>
        )}
      </div>
    </div>
  )
} 