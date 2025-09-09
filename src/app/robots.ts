import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/claim-domain'], // Private page, should not be indexed
    },
    sitemap: 'https://andreasmogensen.dk/sitemap.xml',
  }
}
