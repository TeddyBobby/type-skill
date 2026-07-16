import type { ChallengeMeta } from './types'
import challengesData from '@/../data/challenges.json'

// 难度中文映射
export const DIFFICULTY_LABELS: Record<string, string> = {
  warm: '热身',
  easy: '简单',
  medium: '中等',
  hard: '困难',
  extreme: '地狱',
}

// 难度颜色映射
export const DIFFICULTY_COLORS: Record<string, string> = {
  warm: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
  easy: 'text-green-400 bg-green-500/10 border-green-500/20',
  medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  hard: 'text-red-400 bg-red-500/10 border-red-500/20',
  extreme: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
}

const challengeMap = new Map<string, ChallengeMeta>()
for (const c of challengesData as ChallengeMeta[]) {
  challengeMap.set(c.id, c)
}

export function getAllChallenges(): ChallengeMeta[] {
  return challengesData as ChallengeMeta[]
}

export function getChallengeMeta(id: string): ChallengeMeta | null {
  return challengeMap.get(id) || null
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  for (const c of challengesData as ChallengeMeta[]) {
    for (const tag of c.tags) tagSet.add(tag)
  }
  return [...tagSet].sort()
}

export function getAdjacentChallenges(id: string): { prev: ChallengeMeta | null; next: ChallengeMeta | null } {
  const all = getAllChallenges()
  const idx = all.findIndex(c => c.id === id)
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}
