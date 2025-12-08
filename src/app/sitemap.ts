import { MetadataRoute } from 'next'
import { containers } from '../data/containers'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ldstock.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/Catalogue`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Pages produits dynamiques
  const productPages: MetadataRoute.Sitemap = containers.map((container) => ({
    url: `${siteUrl}/produit?id=${container.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Pages de filtres du catalogue
  const filterPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/Catalogue?type=conteneur`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/Catalogue?type=bungalow`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/Catalogue?state=neuf`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/Catalogue?state=occasion`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  return [...basePages, ...productPages, ...filterPages]
}
