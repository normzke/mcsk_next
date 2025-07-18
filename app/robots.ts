import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/private/',
      ],
    },
    sitemap: 'https://mcsk.or.ke/sitemap.xml',
    host: 'https://mcsk.or.ke',
  }
}
