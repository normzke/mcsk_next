"use client"

import * as React from "react"
import Image from "next/image"
import { ImagePlus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[] | string | null | undefined
}

// Image compression function
const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const img = new window.Image()
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
      resolve(compressedDataUrl)
    }
    
    img.src = URL.createObjectURL(file)
  })
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      // Show loading state
      const loadingElement = document.createElement('div')
      loadingElement.textContent = 'Uploading image...'
      loadingElement.setAttribute('data-loading', 'image-upload')
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

      // Upload to server
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
      
      // Remove loading state
      const existingLoading = document.querySelector('[data-loading="image-upload"]')
      if (existingLoading) {
        document.body.removeChild(existingLoading)
      }
      
      onChange(result.file)
    } catch (error) {
      console.error('Image upload failed:', error)
      // Remove loading state if it exists
      const existingLoading = document.querySelector('[data-loading="image-upload"]')
      if (existingLoading) {
        document.body.removeChild(existingLoading)
      }
      // You might want to show an error toast here
    }
  }

  // Normalize value to array
  const valueArray = Array.isArray(value) ? value : (value ? [value] : [])
  
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {valueArray.length > 0 && valueArray.map((url) => (
          <div
            key={url}
            className="relative h-24 w-24 overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </div>
        ))}
      </div>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={disabled}
        />
        <Button
          type="button"
          disabled={disabled}
          variant="secondary"
          className="w-full"
        >
          <ImagePlus className="mr-2 h-4 w-4" />
          Upload an Image
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Images will be automatically compressed for optimal performance
      </p>
    </div>
  )
} 