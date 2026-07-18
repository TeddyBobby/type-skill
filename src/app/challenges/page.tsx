'use client'

import { useState, useMemo, useEffect } from 'react'
import { Header } from '@/components/header'
import { ChallengeCard } from '@/components/challenge-card'
import { getAllChallenges, DIFFICULTY_LABELS } from '@/lib/challenges'
import { getCompletedChallenges, getBookmarkedChallenges, toggleBookmark } from '@/lib/storage'

const PAGE_SIZE = 15

export default function ChallengesPage() {
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [completedSet, setCompletedSet] = useState<Set<string>>(new Set())
  const [bookmarkSet, setBookmarkSet] = useState<Set<string>>(new Set())
  const challenges = useMemo(() => getAllChallenges(), [])
  const total = challenges.length

  useEffect(() => {
    setCompletedSet(getCompletedChallenges())
    setBookmarkSet(getBookmarkedChallenges())
  }, [])

  const completedCount = useMemo(() => challenges.filter((c) => completedSet.has(c.id)).length, [challenges, completedSet])

  const filteredChallenges = useMemo(() => {
    let result = challenges
    if (filter === 'bookmarked') result = result.filter((c) => bookmarkSet.has(c.id))
    else if (filter !== 'all') result = result.filter((c) => c.difficulty === filter)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter((c) =>
        c.titleCN.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) || c.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [challenges, filter, bookmarkSet, search])

  useEffect(() => setPage(1), [filter, search])
  const totalPages = Math.max(1, Math.ceil(filteredChallenges.length / PAGE_SIZE))
  const pagedChallenges = filteredChallenges.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[22px] font-semibold text-[var(--fg-primary)] tracking-tight">题库</h1>
            <p className="text-[12px] text-[var(--fg-muted)] mt-0.5">{total} 题 · 已通关 {completedCount}</p>
          </div>
        </div>

        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索题目…" className="input mb-3" />

        <div className="flex gap-1.5 mb-4 overflow-x-auto pb-0.5">
          <button onClick={() => setFilter('all')} className={`tab ${filter === 'all' ? 'active' : ''}`}>全部</button>
          <button onClick={() => setFilter('bookmarked')} className={`tab ${filter === 'bookmarked' ? 'bookmark-active' : ''}`}>&#9733; {bookmarkSet.size}</button>
          {(['warm','easy','medium','hard','extreme'] as const).map((d) => (
            <button key={d} onClick={() => setFilter(d)} className={`tab ${filter === d ? 'active' : ''}`}>{DIFFICULTY_LABELS[d]}</button>
          ))}
        </div>

        <div className="min-h-[400px] space-y-2">
          {pagedChallenges.length === 0 ? (
            <div className="text-center py-16 text-[var(--fg-muted)] text-[13px]">
              {filter === 'bookmarked' ? '没有收藏的题目' : search ? '没有匹配结果' : '暂无题目'}
            </div>
          ) : (
            pagedChallenges.map((c) => (
              <ChallengeCard key={c.id} challenge={c}
                completed={completedSet.has(c.id)} bookmarked={bookmarkSet.has(c.id)}
                onToggleBookmark={() => {
                  const now = toggleBookmark(c.id)
                  setBookmarkSet((prev) => { const next = new Set(prev); now ? next.add(c.id) : next.delete(c.id); return next })
                }} />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="tab disabled:opacity-30">←</button>
            <span className="text-[12px] text-[var(--fg-muted)] tabular-nums px-1">{page} / {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="tab disabled:opacity-30">→</button>
          </div>
        )}
      </main>
    </>
  )
}
