import type { ChallengeMeta } from './types'
import challengesData from '@/../data/challenges.json'

// 难度标签/配色已抽到 ./difficulty（避免客户端引入整份 challenges.json），
// 这里仅重导出以兼容服务端旧 import 路径。
export { DIFFICULTY_LABELS, DIFFICULTY_COLORS } from './difficulty'

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
