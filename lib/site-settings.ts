import { prisma } from './prisma'

interface SiteSetting {
  key: string;
  value: string;
  group: string;
}

interface SiteSettings {
  [key: string]: string | undefined;
  headerLogo?: string;
  footerLogo?: string;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settings = await prisma.setting.findMany({
      where: {
        group: 'site'
      }
    });

    // Convert settings array to object
    const settingsObject: SiteSettings = {};
    settings.forEach((setting: SiteSetting) => {
      settingsObject[setting.key] = setting.value;
    });

    return settingsObject;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return {} as SiteSettings;
  }
}

export async function getLogoUrl(type: 'header' | 'footer' | 'main' = 'main'): Promise<string> {
  const settings = await getSiteSettings()
  
  if (type === 'header') {
    return settings.headerLogo || '/images/MCSK Logo.png'
  } else if (type === 'footer') {
    return settings.footerLogo || '/images/mcsk-logo-white.svg'
  } else {
    // Default/main logo
    return settings.headerLogo || '/images/MCSK Logo.png'
  }
} 