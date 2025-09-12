'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Upload, Image as ImageIcon, Save, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface SiteSettings {
  headerLogo?: string
  footerLogo?: string
  siteName?: string
  siteDescription?: string
  contactEmail?: string
  contactPhone?: string
  contactAddress?: string
}

export function SiteSettingsForm() {
  const [settings, setSettings] = useState<SiteSettings>({})
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/site-settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const handleLogoUpload = async (type: 'header' | 'footer', file: File) => {
    if (!file) return

    const formData = new FormData()
    formData.append('logo', file)
    formData.append('type', type)

    setUploading(type)
    setLoading(true)

    try {
      const response = await fetch('/api/admin/site-settings/upload-logo', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setSettings(prev => ({
          ...prev,
          [type === 'header' ? 'headerLogo' : 'footerLogo']: data.logoUrl
        }))
        toast.success(`${type === 'header' ? 'Header' : 'Footer'} logo updated successfully`)
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to upload logo')
      }
    } catch (error) {
      toast.error('Error uploading logo')
    } finally {
      setUploading(null)
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast.success('Settings saved successfully')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to save settings')
      }
    } catch (error) {
      toast.error('Error saving settings')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (type: 'header' | 'footer', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleLogoUpload(type, file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Logo Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Logo Management
          </CardTitle>
          <CardDescription>
            Upload and manage logos for header and footer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Header Logo */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Header Logo</Label>
              <p className="text-sm text-muted-foreground">
                This logo appears in the navigation header
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {settings.headerLogo && (
                <div className="relative">
                  <Image
                    src={settings.headerLogo}
                    alt="Header Logo"
                    width={80}
                    height={80}
                    className="rounded-lg border"
                  />
                </div>
              )}
              
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('header', e)}
                  disabled={uploading === 'header'}
                  className="max-w-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: PNG or SVG, max 2MB
                </p>
              </div>
              
              {uploading === 'header' && (
                <RefreshCw className="h-4 w-4 animate-spin" />
              )}
            </div>
          </div>

          <Separator />

          {/* Footer Logo */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Footer Logo</Label>
              <p className="text-sm text-muted-foreground">
                This logo appears in the footer (preferably white/light version)
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {settings.footerLogo && (
                <div className="relative">
                  <Image
                    src={settings.footerLogo}
                    alt="Footer Logo"
                    width={80}
                    height={80}
                    className="rounded-lg border"
                  />
                </div>
              )}
              
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('footer', e)}
                  disabled={uploading === 'footer'}
                  className="max-w-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: PNG or SVG with transparent background, max 2MB
                </p>
              </div>
              
              {uploading === 'footer' && (
                <RefreshCw className="h-4 w-4 animate-spin" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Manage basic site information and contact details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                placeholder="MCSK"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="music@mcsk.org"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={settings.contactPhone || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
                placeholder="+254 733 400204"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactAddress">Contact Address</Label>
              <Input
                id="contactAddress"
                value={settings.contactAddress || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, contactAddress: e.target.value }))}
                placeholder="Sports Road, Westlands, Nairobi"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Input
              id="siteDescription"
              value={settings.siteDescription || ''}
              onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
              placeholder="Protecting and promoting music rights in Kenya"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Settings
        </Button>
      </div>
    </div>
  )
} 