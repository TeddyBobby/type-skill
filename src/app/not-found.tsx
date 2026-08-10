import Link from 'next/link'
import { Header } from '@/components/header'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="w-full max-w-2xl mx-auto px-4 py-20">
        <div className="text-center">
          {/* 404 indicator */}
          <div
            className="mx-auto mb-6 w-14 h-14 rounded-full flex items-center justify-center text-[20px] font-mono font-medium"
            style={{
              background: 'rgba(94,106,210,0.08)',
              color: 'var(--accent)',
              border: '1px solid rgba(94,106,210,0.15)',
            }}
          >
            404
          </div>

          {/* Title */}
          <h1
            className="text-[20px] font-semibold mb-2"
            style={{ color: 'var(--fg-primary)', letterSpacing: '-0.02em' }}
          >
            页面不存在
          </h1>

          {/* Description */}
          <p
            className="text-[13px] leading-relaxed mb-6 max-w-md mx-auto"
            style={{ color: 'var(--fg-muted)' }}
          >
            你访问的页面可能已被移除、地址拼写错误，或者暂时不可用。
          </p>

          {/* Suggestions */}
          <div
            className="mb-6 p-3 rounded-lg text-left inline-block mx-auto"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border)',
            }}
          >
            <div
              className="text-[11px] mb-2 font-medium"
              style={{ color: 'var(--fg-subtle)' }}
            >
              你可能想找：
            </div>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/challenges"
                  className="text-[13px] hover:underline transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  题库 &rarr;
                </Link>
                <span className="text-[11px] ml-1.5" style={{ color: 'var(--fg-muted)' }}>190 道 TypeScript 类型题</span>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[13px] hover:underline transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  首页 &rarr;
                </Link>
                <span className="text-[11px] ml-1.5" style={{ color: 'var(--fg-muted)' }}>TypeSkill 使用指南</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-[13px] font-medium text-white transition-colors hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              返回首页
            </Link>
            <Link
              href="/challenges"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-[13px] font-medium transition-colors"
              style={{
                color: 'var(--fg-secondary)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
              }}
            >
              浏览题库
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
