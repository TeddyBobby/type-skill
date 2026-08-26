import type { Metadata } from 'next'
import { getChallengeMeta, DIFFICULTY_LABELS } from '@/lib/challenges'
import { SITE_URL } from '@/lib/site'
import { ChallengeClient } from '@/components/challenge-client'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const meta = getChallengeMeta(id)

  if (!meta) {
    return { title: '题目不存在 — TypeSkill' }
  }

  const difficulty = DIFFICULTY_LABELS[meta.difficulty] || meta.difficulty
  const description = meta.description
    ? `${meta.title}（${difficulty}）— ${meta.description}`
    : `${meta.title} — TypeScript 类型挑战，${difficulty}难度。在线编写类型实现，服务端编译验证。`

  return {
    title: meta.title,
    description,
    alternates: {
      canonical: `${SITE_URL}/challenge/${meta.id}`,
    },
    openGraph: {
      title: `${meta.title} — TypeSkill`,
      description,
      url: `${SITE_URL}/challenge/${meta.id}`,
      type: 'article',
      locale: 'zh_CN',
      siteName: 'TypeSkill',
    },
    twitter: {
      title: `${meta.title} — TypeSkill`,
      description,
    },
  }
}

export default async function ChallengePage({ params }: PageProps) {
  const { id } = await params
  return <ChallengeClient id={id} />
}
