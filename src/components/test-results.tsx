'use client'

interface TestResultsProps {
  results: { passed: boolean; caseIndex: number; message: string }[]
  loading: boolean
}

export function TestResults({ results, loading }: TestResultsProps) {
  if (loading) {
    return (
      <div className="card p-3">
        <div className="flex items-center gap-2 text-[var(--fg-muted)] text-[13px]">
          <div className="w-3.5 h-3.5 border-2 border-[var(--fg-muted)] border-t-transparent rounded-full animate-spin" />
          检查中...
        </div>
      </div>
    )
  }

  if (results.length === 0) return null

  const allPassed = results.every((r) => r.passed)
  const passedCount = results.filter((r) => r.passed).length

  return (
    <div className="card overflow-hidden">
      <div className="px-3 py-2 flex items-center gap-2 text-[13px] font-medium border-b"
        style={{
          background: allPassed ? 'rgba(39,166,68,0.06)' : 'rgba(224,90,79,0.06)',
          borderColor: allPassed ? 'rgba(39,166,68,0.1)' : 'rgba(224,90,79,0.1)',
          color: allPassed ? 'var(--success)' : 'var(--danger)',
        }}>
        {allPassed ? '全部通过' : `${passedCount}/${results.length} 通过`}
      </div>
      <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
        {results.map((r, i) => (
          <div key={i} className="px-3 py-1.5 flex items-center gap-2 text-[12px]">
            <span style={{ color: r.passed ? 'var(--success)' : 'var(--danger)' }}>
              {r.passed ? '\u2713' : '\u2717'}
            </span>
            <span className="text-[var(--fg-muted)]">{r.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
