import type { MetadataRoute } from 'next'
import { getAllChallenges } from '@/lib/challenges'

const BASE_URL = 'https://type-dojo.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const challenges = getAllChallenges()

  const challengeUrls: MetadataRoute.Sitemap = challenges.map((c) => ({
    url: `${BASE_URL}/challenge/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/challenges`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...challengeUrls,
  ]
}
