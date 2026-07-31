import { Header } from '@/components/header'

// Skeleton block with pulse animation
function Skeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded ${className}`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        ...style,
      }}
    />
  )
}

export default function ChallengeLoading() {
  return (
    <>
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 py-3 sm:py-5">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-3.5 w-10" />
          <span className="text-[var(--border)]">/</span>
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-4 w-10 rounded-sm" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
          {/* Left column — description + notes */}
          <div className="space-y-3 order-2 lg:order-1 lg:col-span-4">
            {/* Description card */}
            <div className="card p-3 space-y-2">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-3/5" />
              <div className="flex gap-1 pt-1">
                <Skeleton className="h-4 w-12 rounded-sm" />
                <Skeleton className="h-4 w-14 rounded-sm" />
                <Skeleton className="h-4 w-10 rounded-sm" />
              </div>
            </div>

            {/* Notes card */}
            <div className="card">
              <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'var(--border)' }}>
                <Skeleton className="h-3 w-8" />
              </div>
              <div className="p-3">
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </div>

          {/* Right column — editor */}
          <div className="order-1 lg:order-2 lg:col-span-8 space-y-2">
            {/* Editor placeholder */}
            <div
              className="rounded-lg overflow-hidden border h-[350px] sm:h-[450px] flex items-center justify-center"
              style={{ borderColor: 'var(--border)', background: 'var(--code-bg)' }}
            >
              <div className="text-center">
                <div
                  className="w-8 h-8 mx-auto mb-3 rounded-full border-2 animate-spin"
                  style={{
                    borderColor: 'var(--border)',
                    borderTopColor: 'var(--accent)',
                  }}
                />
                <div className="text-[12px]" style={{ color: 'var(--fg-muted)' }}>
                  加载题目...
                </div>
              </div>
            </div>

            {/* Button row skeleton */}
            <div className="hidden lg:flex gap-1.5">
              <Skeleton className="flex-1 h-9 rounded-md" style={{ background: 'rgba(94,106,210,0.12)' }} />
              <Skeleton className="h-9 w-16 rounded-md" />
              <Skeleton className="h-9 w-14 rounded-md" />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
