'use client'

interface ProgressBarProps {
  completed: number
  total: number
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[11px] text-[var(--fg-muted)] tabular-nums font-medium">
        {completed}/{total}
      </span>
    </div>
  )
}
