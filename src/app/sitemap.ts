import type { MetadataRoute } from 'next'
import { getAllChallenges } from '@/lib/challenges'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const challenges = getAllChallenges()

  const challengeUrls: MetadataRoute.Sitemap = challenges.map((c) => ({
    url: `${SITE_URL}/challenge/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/challenges`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...challengeUrls,
  ]
}
