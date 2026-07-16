// localStorage 封装 —— 存储已完成题目和编辑器状态

const COMPLETED_KEY = 'typedojo-completed'
const CODE_PREFIX = 'typedojo-code-'

export function getCompletedChallenges(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(COMPLETED_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function markChallengeCompleted(id: string): void {
  const completed = getCompletedChallenges()
  completed.add(id)
  localStorage.setItem(COMPLETED_KEY, JSON.stringify([...completed]))
}

export function isChallengeCompleted(id: string): boolean {
  return getCompletedChallenges().has(id)
}

export function getSavedCode(challengeId: string): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(CODE_PREFIX + challengeId)
}

export function saveCode(challengeId: string, code: string): void {
  localStorage.setItem(CODE_PREFIX + challengeId, code)
}

export function getCompletedCount(): number {
  return getCompletedChallenges().size
}

// 收藏功能
const BOOKMARK_KEY = 'typedojo-bookmarks'

export function getBookmarkedChallenges(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(BOOKMARK_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function toggleBookmark(id: string): boolean {
  const bookmarks = getBookmarkedChallenges()
  if (bookmarks.has(id)) {
    bookmarks.delete(id)
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify([...bookmarks]))
    return false
  } else {
    bookmarks.add(id)
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify([...bookmarks]))
    return true
  }
}

export function isBookmarked(id: string): boolean {
  return getBookmarkedChallenges().has(id)
}

// 笔记功能
const NOTE_PREFIX = 'typedojo-note-'

export function getNote(challengeId: string): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(NOTE_PREFIX + challengeId) || ''
}

export function saveNote(challengeId: string, note: string): void {
  if (note.trim()) {
    localStorage.setItem(NOTE_PREFIX + challengeId, note)
  } else {
    localStorage.removeItem(NOTE_PREFIX + challengeId)
  }
}
