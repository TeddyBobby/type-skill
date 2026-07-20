'use client'

import { useEffect } from 'react'
import { Header } from '@/components/header'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error('[TypeSkill] 页面错误:', error)
  }, [error])

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <>
      <Header />
      <main className="w-full max-w-2xl mx-auto px-4 py-20">
        <div className="text-center">
          {/* Error icon */}
          <div
            className="mx-auto mb-6 w-14 h-14 rounded-full flex items-center justify-center text-[20px] font-medium"
            style={{
              background: 'rgba(224,90,79,0.1)',
              color: 'var(--danger)',
              border: '1px solid rgba(224,90,79,0.15)',
            }}
          >
            !
          </div>

          {/* Title */}
          <h1
            className="text-[20px] font-semibold mb-2"
            style={{ color: 'var(--fg-primary)', letterSpacing: '-0.02em' }}
          >
            页面出错了
          </h1>

          {/* Description */}
          <p
            className="text-[13px] leading-relaxed mb-6 max-w-md mx-auto"
            style={{ color: 'var(--fg-muted)' }}
          >
            遇到了意外错误，请重试。如果问题持续出现，可以刷新页面或返回首页。
          </p>

          {/* Error details (dev only) */}
          {isDev && (
            <div
              className="mb-6 p-3 rounded text-left"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                className="text-[11px] font-mono leading-relaxed break-all"
                style={{ color: 'var(--danger)' }}
              >
                {error.message || '未知错误'}
              </div>
              {error.digest && (
                <div
                  className="text-[10px] font-mono mt-1"
                  style={{ color: 'var(--fg-subtle)' }}
                >
                  digest: {error.digest}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => unstable_retry()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-[13px] font-medium text-white transition-colors hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              重试
            </button>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-[13px] font-medium transition-colors"
              style={{
                color: 'var(--fg-secondary)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
              }}
            >
              刷新页面
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-[13px] transition-colors"
              style={{
                color: 'var(--fg-muted)',
                background: 'transparent',
                border: '1px solid var(--border)',
              }}
            >
              返回首页
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
