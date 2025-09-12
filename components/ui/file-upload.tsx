'use client'

import { useCallback, useState } from 'react'
import { FileIcon, X, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileUploadProps {
  value: string | null
  onChange: (value: string | null) => void
  onRemove: () => void
  accept?: string
  disabled?: boolean
  maxSize?: number // in MB
}

export function FileUpload({
  value,
  onChange,
  onRemove,
  accept = '*/*',
  disabled = false,
  maxSize = 10 // 10MB default
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Clear previous error
    setError(null)

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSize) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    let loadingElement: HTMLDivElement | null = null

    try {
      setIsUploading(true)
      
      // Show loading state
      loadingElement = document.createElement('div')
      loadingElement.textContent = 'Uploading file...'
      loadingElement.style.position = 'fixed'
      loadingElement.style.top = '50%'
      loadingElement.style.left = '50%'
      loadingElement.style.transform = 'translate(-50%, -50%)'
      loadingElement.style.background = 'rgba(0,0,0,0.8)'
      loadingElement.style.color = 'white'
      loadingElement.style.padding = '1rem'
      loadingElement.style.borderRadius = '0.5rem'
      loadingElement.style.zIndex = '9999'
      document.body.appendChild(loadingElement)

      // Use dedicated upload endpoint
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Upload failed')
      }

      const result = await response.json()
      onChange(result.file)
      
      // Remove loading state
      if (loadingElement) {
        document.body.removeChild(loadingElement)
      }
      setIsUploading(false)
    } catch (error) {
      console.error('Upload error:', error)
      setError(error instanceof Error ? error.message : 'Failed to upload file')
      if (loadingElement) {
        document.body.removeChild(loadingElement)
      }
      setIsUploading(false)
    }
  }, [onChange, maxSize])

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <div className="relative w-full h-32 rounded-md border border-dashed flex items-center justify-center">
          <input
            type="file"
            accept={accept}
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleUpload}
            disabled={disabled || isUploading}
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
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {isUploading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              ) : (
                <Upload className="h-10 w-10 text-gray-400" />
              )}
              <span className="text-sm text-gray-500">
                {isUploading ? 'Uploading...' : 'Upload File'}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      <p className="text-xs text-gray-500">
        Maximum file size: {maxSize}MB
      </p>
    </div>
  )
} 