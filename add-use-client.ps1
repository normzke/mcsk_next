$files = @(
    "mcsk-next/app/admin/news/_components/news-form.tsx",
    "mcsk-next/app/admin/news/data-table.tsx",
    "mcsk-next/app/admin/services/_components/service-form.tsx",
    "mcsk-next/app/admin/partners/_components/partner-form.tsx",
    "mcsk-next/app/admin/management/_components/management-form.tsx",
    "mcsk-next/app/admin/hero-slides/_components/hero-slide-form.tsx",
    "mcsk-next/app/admin/events/_components/event-form.tsx",
    "mcsk-next/app/news/components/news-content.tsx",
    "mcsk-next/app/membership/components/membership-content.tsx",
    "mcsk-next/app/licensing/components/licensing-content.tsx",
    "mcsk-next/app/gallery/components/gallery-content.tsx",
    "mcsk-next/app/faqs/components/faqs-content.tsx",
    "mcsk-next/app/events/components/events-content.tsx",
    "mcsk-next/app/downloads/components/downloads-content.tsx",
    "mcsk-next/app/contact/components/contact-content.tsx",
    "mcsk-next/components/ui/search-provider.tsx",
    "mcsk-next/components/ui/pdf-viewer.tsx",
    "mcsk-next/components/ui/image-upload.tsx",
    "mcsk-next/components/ui/file-upload.tsx",
    "mcsk-next/components/ui/stats-section.tsx",
    "mcsk-next/components/ui/services-grid.tsx",
    "mcsk-next/components/hero-slider.tsx",
    "mcsk-next/components/data-table.tsx",
    "mcsk-next/components/careers/job-dialog.tsx",
    "mcsk-next/app/careers/page.tsx",
    "mcsk-next/app/about/leadership/page.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -notmatch "^'use client'") {
            $newContent = "'use client'`n`n" + $content
            Set-Content -Path $file -Value $newContent -NoNewline
            Write-Host "Added 'use client' to $file"
        } else {
            Write-Host "'use client' already exists in $file"
        }
    } else {
        Write-Host "File not found: $file"
    }
} 