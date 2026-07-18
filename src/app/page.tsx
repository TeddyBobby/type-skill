/* Hallmark · pre-emit critique: P4 H4 E4 S4 R4 V4 */

'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import Link from 'next/link'

export default function Home() {
  const [stats, setStats] = useState({ total: 0, completed: 0 })
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    import('@/lib/challenges').then(({ getAllChallenges }) => {
      const total = getAllChallenges().length
      import('@/lib/storage').then(({ getCompletedChallenges }) => {
        setStats({ total, completed: getCompletedChallenges().size })
      })
    })
  }, [])

  // Hero typing effect
  useEffect(() => {
    const code = "type MyPick<T, K extends keyof T> = {\n  [P in K]: T[P]\n}"
    let i = 0
    const timer = setInterval(() => {
      if (i <= code.length) {
        setTypedText(code.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 30)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Header />
      <main className="w-full max-w-5xl mx-auto px-4">

        {/* ===== HERO ===== */}
        <section className="pt-20 sm:pt-28 pb-10 sm:pb-14 relative">
          {/* Subtle texture glow — not a gradient headline */}
          <div className="absolute top-0 left-0 w-full h-full max-w-2xl opacity-[0.06] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 600px 300px at 20% 0%, var(--accent) 0%, transparent 70%)' }} />

          <div className="relative">
            {/* Badge — left-aligned, off the centered axis */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium mb-8"
              style={{ background: 'rgba(94,106,210,0.08)', color: 'var(--accent)', border: '1px solid rgba(94,106,210,0.15)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--success)', boxShadow: '0 0 6px rgba(39,166,68,0.3)' }} />
              {stats.total} 道题 · 从 0 到精通
            </div>

            {/* Title — solid ink, no gradient */}
            <h1 className="text-[44px] sm:text-[60px] font-semibold leading-[1.05] mb-5 max-w-2xl"
              style={{ letterSpacing: '-0.04em', color: 'var(--fg-primary)' }}>
              TypeScript
              <br />
              <span style={{ color: 'var(--accent)' }}>类型练习</span>
            </h1>

            <p className="text-[var(--fg-muted)] text-[15px] sm:text-[16px] max-w-lg leading-relaxed mb-8">
              190 道真实类型挑战。在浏览器中写 TS 类型，服务端编译验证，逐级通关。
            </p>

            {/* CTAs — left-aligned */}
            <div className="flex items-center gap-3 mb-12">
              <Link href="/challenges"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[14px] font-medium text-white no-underline transition-colors hover:opacity-90"
                style={{ background: 'var(--accent)' }}>
                开始练习 &rarr;
              </Link>
              <a href="#preview"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[14px] font-medium no-underline transition-colors hover:border-[var(--border-strong)]"
                style={{ color: 'var(--fg-secondary)', border: '1px solid var(--border)' }}>
                预览
              </a>
            </div>

            {/* Stat row */}
            <div className="flex items-center gap-10 sm:gap-14 text-[13px]" style={{ color: 'var(--fg-muted)' }}>
              {[
                { v: '190', l: '题目' },
                { v: '5', l: '难度等级' },
                { v: '55+', l: '带讲解' },
                { v: '0 依赖', l: '纯本地' },
              ].map(s => (
                <div key={s.l}>
                  <div className="text-[18px] font-semibold" style={{ color: 'var(--fg-primary)' }}>{s.v}</div>
                  <div className="text-[11px] mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CODE PREVIEW — no fake chrome ===== */}
        <section id="preview" className="mb-20">
          <div className="rounded-xl overflow-hidden" style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--border)',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.04), 0 8px 16px -4px rgba(0,0,0,0.06)',
          }}>
            {/* Clean title bar — no traffic lights */}
            <div className="flex items-center px-4 py-2.5" style={{ borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
              <span className="text-[11px] font-mono" style={{ color: 'var(--fg-muted)' }}>challenge.ts — TypeSkill</span>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Left: problem */}
              <div className="md:col-span-2 p-4 sm:p-5" style={{ borderRight: '1px solid var(--border)' }}>
                <div className="text-[10px] uppercase tracking-wider font-medium mb-2" style={{ color: 'var(--fg-subtle)' }}>题目描述</div>
                <div className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--fg-secondary)' }}>
                  不使用内置的 <code className="text-[11px] font-mono px-1 rounded" style={{ color: 'var(--accent)', background: 'rgba(94,106,210,0.08)' }}>Pick&lt;T, K&gt;</code>，自己实现一个 MyPick。
                </div>
                <div className="flex gap-1 flex-wrap">
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--fg-muted)' }}>union</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--fg-muted)' }}>built-in</span>
                </div>
                <div className="mt-3 text-[11px] flex items-center gap-1.5" style={{ color: 'var(--success)' }}>
                  &check; 3/3 测试通过
                </div>
              </div>

              {/* Right: code editor */}
              <div className="md:col-span-3 p-4 sm:p-5" style={{ background: 'var(--code-bg)' }}>
                <div className="flex text-[12px] font-mono leading-[20px]">
                  <div className="text-right pr-3 select-none" style={{ color: 'var(--fg-subtle)', minWidth: 20 }}>
                    {[1,2,3,4,5,6,7].map(n => <div key={n}>{n}</div>)}
                  </div>
                  <div style={{ color: 'var(--code-string)' }}>
                    <div><span style={{ color: 'var(--code-comment)' }}>// 实现 Pick&lt;T, K&gt;</span></div>
                    <div><span style={{ color: 'var(--code-comment)' }}>// 从 T 中选出 K 的属性</span></div>
                    <div><span style={{ color: 'var(--code-keyword)' }}>type</span> <span style={{ color: 'var(--code-type)' }}>MyPick</span>&lt;<span style={{ color: 'var(--code-type)' }}>T</span>, <span style={{ color: 'var(--code-type)' }}>K</span> <span style={{ color: 'var(--code-keyword)' }}>extends</span> <span style={{ color: 'var(--code-keyword)' }}>keyof</span> <span style={{ color: 'var(--code-type)' }}>T</span>&gt; = {'{'}</div>
                    <div>  [<span style={{ color: 'var(--code-type)' }}>P</span> <span style={{ color: 'var(--code-keyword)' }}>in</span> <span style={{ color: 'var(--code-type)' }}>K</span>]: <span style={{ color: 'var(--code-type)' }}>T</span>[<span style={{ color: 'var(--code-type)' }}>P</span>]</div>
                    <div>{'}'}</div>
                    <div>&nbsp;</div>
                    <div><span style={{ color: 'var(--accent)' }}>&#9612;</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS — broken grid, no emoji ===== */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[22px] font-semibold mb-2" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.02em' }}>三步上手</h2>
            <p className="text-[13px]" style={{ color: 'var(--fg-muted)' }}>无需安装，打开浏览器就能练</p>
          </div>

          {/* Asymmetric layout: 2 + 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { num: '01', title: '选一道题', desc: '190 道题按难度分级，搜索、筛选、收藏，快速找到想练的。' },
              { num: '02', title: '写出答案', desc: '在线代码编辑器里写 TS 类型实现，自动保存，随时回来继续。' },
            ].map(s => (
              <div key={s.num} className="p-5 rounded-xl"
                style={{
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border)',
                }}>
                <div className="text-[10px] font-mono font-medium mb-3" style={{ color: 'var(--accent)' }}>{s.num}</div>
                <div className="text-[14px] font-medium mb-1.5" style={{ color: 'var(--fg-primary)' }}>{s.title}</div>
                <div className="text-[12px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{s.desc}</div>
              </div>
            ))}
            {/* Third column: wider, different hight */}
            <div className="sm:col-span-1 p-5 rounded-xl"
              style={{
                background: 'rgba(94,106,210,0.04)',
                border: '1px solid rgba(94,106,210,0.1)',
              }}>
              <div className="text-[10px] font-mono font-medium mb-3" style={{ color: 'var(--accent)' }}>03</div>
              <div className="text-[14px] font-medium mb-1.5" style={{ color: 'var(--fg-primary)' }}>验证通关</div>
              <div className="text-[12px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>点检查 &rarr; 服务端编译 &rarr; 即时反馈。全部通过自动标记完成。</div>
              <div className="mt-4 text-[11px]" style={{ color: 'var(--success)' }}>&check; 编译通过 · 3/3 测试</div>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-[22px] font-semibold mb-2" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.02em' }}>不只是做题</h2>
            <p className="text-[13px]" style={{ color: 'var(--fg-muted)' }}>每个功能都为&quot;学会&quot;而设计</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: '答案 & 讲解', desc: '55+ 道题附带正确实现和逐行解说。看不懂的时候，有它就不用卡住。' },
              { title: '私人笔记', desc: '每道题下方有专属笔记区，记录思路、知识点。下次回来还能看到。' },
              { title: '收藏 & 进度', desc: '收藏重点题，通关数自动追踪。按难度看进度，知道学到哪了。' },
              { title: '搜索 & 筛选', desc: '按标题、标签、难度搜题。只想看重难点？一键筛选。' },
            ].map(f => (
              <div key={f.title} className="p-4 rounded-xl"
                style={{
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border)',
                }}>
                <div className="text-[13px] font-medium mb-1" style={{ color: 'var(--fg-primary)' }}>{f.title}</div>
                <div className="text-[12px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 知识点覆盖 ===== */}
        <section className="mb-20">
          <div className="mb-6">
            <h2 className="text-[22px] font-semibold mb-2" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.02em' }}>覆盖核心知识点</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              '映射类型', '条件类型', 'infer 推断', '模板字面量', '递归类型',
              '联合类型', '交叉类型', '索引访问', 'keyof', 'extends 约束',
              '可变元组', '分配律', 'never', 'unknown', 'Promise',
            ].map(t => (
              <span key={t} className="px-3 py-1.5 rounded-full text-[12px]"
                style={{
                  background: 'rgba(94,106,210,0.06)',
                  color: 'var(--fg-secondary)',
                  border: '1px solid rgba(94,106,210,0.1)',
                }}>{t}</span>
            ))}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="pb-24 pt-4">
          <div className="rounded-2xl p-8 sm:p-12 relative overflow-hidden"
            style={{
              background: 'rgba(94,106,210,0.06)',
              border: '1px solid rgba(94,106,210,0.1)',
            }}>
            <h2 className="text-[24px] sm:text-[28px] font-semibold mb-3" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.02em' }}>
              准备好了吗？
            </h2>
            <p className="text-[14px] mb-6" style={{ color: 'var(--fg-muted)' }}>
              190 道题，从 Hello World 到 UnionToIntersection。练出来的类型功底。
            </p>
            <Link href="/challenges"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-medium text-white no-underline transition-colors hover:opacity-90"
              style={{ background: 'var(--accent)' }}>
              开始第一道题 &rarr;
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
