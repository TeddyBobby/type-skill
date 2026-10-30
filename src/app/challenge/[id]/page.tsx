import type { Metadata } from 'next'
import { getChallengeMeta, getAdjacentChallenges } from '@/lib/challenges'
import { DIFFICULTY_LABELS } from '@/lib/difficulty'
import { SITE_URL } from '@/lib/site'
import { ChallengeClient } from '@/components/challenge-client'
import type { ChallengeMeta } from '@/lib/types'

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

  // 服务端一次取出题目元数据与相邻题目，通过 props 传给客户端组件，
  // 客户端因此无需 import challenges.ts，避免整份 challenges.json 打进 client bundle。
  const meta = getChallengeMeta(id)
  const { prev, next } = meta ? getAdjacentChallenges(id) : { prev: null, next: null }
  const toNav = (c: ChallengeMeta | null) => (c ? { id: c.id, titleCN: c.titleCN } : null)

  return <ChallengeClient id={id} meta={meta} prev={toNav(prev)} next={toNav(next)} />
}
