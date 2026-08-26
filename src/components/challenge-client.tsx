'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { CodeEditor } from '@/components/code-editor'
import { TestResults } from '@/components/test-results'
import { getChallengeMeta, getAdjacentChallenges, DIFFICULTY_LABELS } from '@/lib/challenges'
import { getSavedCode, saveCode, markChallengeCompleted, isChallengeCompleted, isBookmarked, toggleBookmark, getNote, saveNote } from '@/lib/storage'
import type { CheckResponse } from '@/lib/types'

export function ChallengeClient({ id }: { id: string }) {
  const meta = getChallengeMeta(id)

  const [code, setCode] = useState('')
  const [initialCode, setInitialCode] = useState('')
  const [results, setResults] = useState<CheckResponse['results']>([])
  const [errors, setErrors] = useState<CheckResponse['errors']>([])
  const [checking, setChecking] = useState(false)
  const [allPassed, setAllPassed] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [templateLoaded, setTemplateLoaded] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [note, setNote] = useState('')
  const [copied, setCopied] = useState(false)
  const [light, setLight] = useState(false)

  useEffect(() => {
    if (!id) return
    const saved = getSavedCode(id)
    if (saved) { setCode(saved); setInitialCode(saved); setTemplateLoaded(true) }
    else {
      fetch(`/api/template/${id}`).then(r => r.text()).then(t => { setCode(t); setInitialCode(t); setTemplateLoaded(true) })
        .catch(() => { setCode('// 加载失败'); setInitialCode('// 加载失败'); setTemplateLoaded(true) })
    }
    setCompleted(isChallengeCompleted(id))
    setBookmarked(isBookmarked(id))
    setNote(getNote(id))
    setLight(document.documentElement.getAttribute('data-theme') === 'light')
    setAllPassed(false); setResults([]); setErrors([]); setShowSolution(false)
  }, [id])

  // 监听主题切换
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setLight(document.documentElement.getAttribute('data-theme') === 'light')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const handleCheck = useCallback(async () => {
    if (!id) return; setChecking(true); setResults([]); setErrors([])
    try {
      const res = await fetch('/api/check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code, challengeId: id }) })
      const data: CheckResponse = await res.json()
      setResults(data.results); setErrors(data.errors)
      if (data.success && data.results.length > 0) { setAllPassed(true); markChallengeCompleted(id); setCompleted(true) }
      else setAllPassed(false)
    } catch (err) { setErrors([{ line: 0, column: 0, message: `网络错误: ${err instanceof Error ? err.message : '?'}` }]) }
    finally { setChecking(false) }
  }, [code, id])

  useEffect(() => { if (id && code !== initialCode && templateLoaded) { const t = setTimeout(() => saveCode(id, code), 500); return () => clearTimeout(t) } }, [code, id, initialCode, templateLoaded])
  useEffect(() => { if (id) { const t = setTimeout(() => saveNote(id, note), 500); return () => clearTimeout(t) } }, [note, id])

  // 键盘快捷键：Cmd/Ctrl+Enter 检查答案，Escape 关闭答案面板
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey
      if (isMod && e.key === 'Enter') {
        e.preventDefault()
        if (!checking && id) handleCheck()
      } else if (e.key === 'Escape' && showSolution) {
        setShowSolution(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [checking, id, showSolution, handleCheck])

  const handleReset = () => { setCode(initialCode); setResults([]); setErrors([]); setAllPassed(false) }

  if (!meta) return <><Header /><main className="max-w-4xl mx-auto px-4 py-20 text-center"><p className="text-[var(--fg-muted)]">题目不存在</p><Link href="/" className="text-[var(--accent)] mt-4 inline-block text-[13px]">← 返回</Link></main></>

  const { prev: prevChallenge, next: nextChallenge } = getAdjacentChallenges(meta.id)

  return (
    <>
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 py-3 sm:py-5">
        {/* Top bar */}
        <div className="flex items-center gap-2 mb-3 flex-wrap text-[13px]">
          <Link href="/challenges" className="text-[var(--fg-muted)] hover:text-[var(--fg-secondary)] transition-colors">← 列表</Link>
          <span className="text-[var(--border)]">/</span>
          <span className="font-medium text-[var(--fg-primary)] tracking-tight">{meta.titleCN}</span>
          <span className={`badge-diff ${meta.difficulty}`}>{DIFFICULTY_LABELS[meta.difficulty]}</span>
          {completed && <span className="badge-diff easy">✓</span>}
          <button onClick={() => { setBookmarked(toggleBookmark(meta.id)) }}
            className={`text-sm ${bookmarked ? 'text-amber-400' : 'text-[var(--fg-subtle)] hover:text-amber-400'}`}>
            {bookmarked ? '★' : '☆'}
          </button>
          <div className="ml-auto flex items-center gap-1">
            {prevChallenge
              ? <Link href={`/challenge/${prevChallenge.id}`} className="btn-ghost text-[11px] px-2 py-1">← {prevChallenge.titleCN}</Link>
              : <span className="text-[11px] text-[var(--fg-subtle)] px-2">首题</span>}
            {nextChallenge && <Link href={`/challenge/${nextChallenge.id}`} className="btn-ghost text-[11px] px-2 py-1">{nextChallenge.titleCN} →</Link>}
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
          {/* Left column */}
          <div className="space-y-3 order-2 lg:order-1 lg:col-span-4">
            {/* Description */}
            <div className="card p-3">
              <h2 className="text-[13px] font-medium text-[var(--fg-primary)] mb-1.5 tracking-tight">题目描述</h2>
              <p className="text-[13px] leading-relaxed text-[var(--fg-secondary)]">{meta.description}</p>
              {meta.example && (
                <div className="mt-2 p-2 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
                  <code className="text-[12px] text-[var(--fg-muted)] font-mono">{meta.example}</code>
                </div>
              )}
              <div className="flex gap-1 mt-2 flex-wrap">
                {meta.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>

            {/* Notes */}
            <div className="card">
              <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'var(--border)' }}>
                <span className="text-[12px] font-medium text-[var(--fg-primary)]">笔记</span>
                {note.trim() && <span className="text-[10px] text-[var(--fg-muted)]">已保存</span>}
              </div>
              <textarea value={note} onChange={(e) => setNote(e.target.value)}
                placeholder="记录知识点、思路…"
                className="w-full min-h-[80px] p-3 text-[12px] bg-transparent border-0 outline-none resize-y text-[var(--fg-secondary)] placeholder:text-[var(--fg-subtle)] leading-relaxed focus:ring-1 focus:ring-[var(--accent)]/30 rounded"
                style={{ fontFamily: 'system-ui, sans-serif' }} />
            </div>

            {/* Solution */}
            {showSolution && meta.solutionCode && (
              <div className="card overflow-hidden" style={{ borderColor: 'rgba(94,106,210,0.2)' }}>
                <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: 'rgba(94,106,210,0.1)', background: 'rgba(94,106,210,0.04)' }}>
                  <span className="text-[12px] font-medium text-[var(--accent)]">参考答案</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => { navigator.clipboard.writeText(meta.solutionCode); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
                      className="text-[11px] btn-ghost px-2 py-0.5">{copied ? '已复制' : '复制'}</button>
                    <button onClick={() => setShowSolution(false)} className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg-secondary)] px-1">收起</button>
                  </div>
                </div>
                <div>
                  <CodeEditor value={meta.solutionCode} onChange={() => {}} readonly={true} light={light} height="h-[300px]" />
                </div>
                {meta.solutionExplanation && (
                  <div className="px-3 py-2 border-t text-[12px] leading-relaxed text-[var(--fg-secondary)] whitespace-pre-line" style={{ borderColor: 'var(--border)' }}>
                    {meta.solutionExplanation}
                  </div>
                )}
              </div>
            )}

            {/* Mobile buttons */}
            <div className="flex gap-1.5 lg:hidden">
              <button onClick={handleCheck} disabled={checking} className="btn-accent flex-1 py-2 text-[13px]">
                {checking ? '检查中…' : '检查'}
              </button>
              <button onClick={handleReset} className="btn-ghost px-3 py-2 text-[13px]">重置</button>
              {!showSolution && meta.solutionCode && (
                <button onClick={() => setShowSolution(true)} className="btn-ghost px-3 py-2 text-[13px]" style={{ color: 'var(--accent)' }}>答案</button>
              )}
            </div>

            <TestResults results={results} loading={checking} />

            {errors.length > 0 && (
              <div className="card p-3" style={{ borderColor: 'rgba(224,90,79,0.15)' }}>
                <div className="text-[11px] font-medium mb-1" style={{ color: 'var(--danger)' }}>类型错误</div>
                {errors.map((e, i) => (
                  <div key={i} className="text-[11px] text-[var(--fg-muted)] font-mono leading-relaxed">
                    <span style={{ color: 'var(--danger)' }}>L{e.line}</span> {e.message}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column - Editor */}
          <div className="order-1 lg:order-2 lg:col-span-8 lg:sticky lg:top-[52px] lg:self-start space-y-2">
            <CodeEditor value={templateLoaded ? code : '// 加载中...'} onChange={setCode} light={light} />

            {/* Desktop buttons */}
            <div className="hidden lg:flex gap-1.5">
              <button onClick={handleCheck} disabled={checking} className="btn-accent flex-1 py-1.5 text-[13px]">
                {checking ? '检查中…' : '检查答案'}
              </button>
              <button onClick={handleReset} className="btn-ghost px-3 py-1.5 text-[13px]">重置</button>
              {!showSolution && meta.solutionCode && (
                <button onClick={() => setShowSolution(true)} className="btn-ghost px-3 py-1.5 text-[13px]" style={{ color: 'var(--accent)' }}>答案</button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-4 flex justify-between">
          <div>{prevChallenge && <Link href={`/challenge/${prevChallenge.id}`} className="btn-ghost text-[12px] px-2.5 py-1.5">← {prevChallenge.titleCN}</Link>}</div>
          <div>{nextChallenge && <Link href={`/challenge/${nextChallenge.id}`} className="btn-ghost text-[12px] px-2.5 py-1.5">{nextChallenge.titleCN} →</Link>}</div>
        </div>
      </main>
    </>
  )
}
