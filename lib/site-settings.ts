import { prisma } from './prisma'

export async function getSiteSettings() {
  try {
    const settings = await prisma.setting.findMany({
      where: {
        group: 'site'
      }
    })

    // Convert settings array to object
    const settingsObject: Record<string, string> = {}
    settings.forEach(setting => {
      settingsObject[setting.key] = setting.value
    })

    return settingsObject
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return {}
  }
}

export async function getLogoUrl(type: 'header' | 'footer'): Promise<string> {
  const settings = await getSiteSettings()
  
  if (type === 'header') {
    return settings.headerLogo || '/images/MCSK Logo.png'
  } else {
    return settings.footerLogo || '/images/mcsk-logo-white.svg'
  }
} 