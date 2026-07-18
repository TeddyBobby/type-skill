'use client'

import Link from 'next/link'
import type { ChallengeMeta } from '@/lib/types'

interface ChallengeCardProps {
  challenge: ChallengeMeta
  completed: boolean
  bookmarked: boolean
  onToggleBookmark: () => void
}

export function ChallengeCard({ challenge, completed, bookmarked, onToggleBookmark }: ChallengeCardProps) {
  return (
    <div className="card flex items-start gap-3 p-3 hover:border-[var(--border-strong)] transition-all duration-150 group cursor-pointer">
      <Link href={`/challenge/${challenge.id}`} className="flex items-start gap-3 flex-1 min-w-0">
        {/* Number */}
        <div className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center text-xs font-mono font-medium"
          style={completed
            ? { background: 'rgba(39,166,68,0.1)', color: 'var(--success)', border: '1px solid rgba(39,166,68,0.15)' }
            : { background: 'rgba(255,255,255,0.04)', color: 'var(--fg-muted)' }
          }>
          {completed ? '✓' : challenge.id}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium text-[var(--fg-primary)] group-hover:text-[var(--accent)] transition-colors text-[13px] tracking-tight">
              {challenge.titleCN}
            </h3>
            <span className={`badge-diff ${challenge.difficulty}`}>
              {({ warm: '热身', easy: '简单', medium: '中等', hard: '困难', extreme: '地狱' })[challenge.difficulty]}
            </span>
          </div>
          <p className="text-[12px] text-[var(--fg-muted)] mt-1 line-clamp-1 leading-relaxed">
            {challenge.description}
          </p>
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {challenge.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </Link>

      <div className="flex-shrink-0 flex items-center gap-0.5 self-center">
        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleBookmark() }}
          className={`p-1 rounded transition-colors text-sm ${
            bookmarked ? 'text-amber-400' : 'text-[var(--fg-subtle)] hover:text-amber-400'
          }`}>
          {bookmarked ? '★' : '☆'}
        </button>
      </div>
    </div>
  )
}
