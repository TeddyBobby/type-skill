'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('typedojo-theme') as 'dark' | 'light' | null
    if (saved) {
      setTheme(saved)
      document.documentElement.setAttribute('data-theme', saved)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('typedojo-theme', next)
  }

  return (
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: 'var(--border)', background: theme === 'dark' ? 'rgba(8,9,10,0.85)' : 'rgba(247,248,248,0.85)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-7xl mx-auto px-4 h-11 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-semibold text-[15px] tracking-tight text-[var(--fg-primary)]">
            Type<span style={{ color: 'var(--accent)' }}>Skill</span>
          </span>
          <span className="text-[var(--fg-muted)] text-[13px] hidden sm:inline" style={{ fontWeight: 400 }}>
            &mdash; 练出来的类型功底
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-[13px] text-[var(--fg-muted)]">
          <Link href="/challenges" className="hover:text-[var(--fg-secondary)] transition-colors">题库</Link>
          <button onClick={toggleTheme} className="hover:text-[var(--fg-secondary)] transition-colors text-[11px] font-medium px-2 py-0.5 rounded border"
            style={{ borderColor: 'var(--border)' }}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <a href="https://github.com/type-challenges/type-challenges" target="_blank" rel="noopener noreferrer"
            className="hover:text-[var(--fg-secondary)] transition-colors hidden sm:inline">题目来源</a>
          <a href="https://www.typescriptlang.org/docs/handbook/2/types-from-types.html" target="_blank" rel="noopener noreferrer"
            className="hover:text-[var(--fg-secondary)] transition-colors hidden sm:inline">TS 手册</a>
        </nav>
      </div>
    </header>
  )
}
