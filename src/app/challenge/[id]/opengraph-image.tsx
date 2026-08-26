import { ImageResponse } from 'next/og'
import { getChallengeMeta } from '@/lib/challenges'

export const alt = 'TypeSkill — TypeScript type challenge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const DIFFICULTY_EN: Record<string, string> = {
  warm: 'Warm-up',
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  extreme: 'Extreme',
}

const DIFFICULTY_COLOR: Record<string, string> = {
  warm: '#8a8f98',
  easy: '#27a644',
  medium: '#d9a01a',
  hard: '#e05a4f',
  extreme: '#a78bfa',
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const meta = getChallengeMeta(id)

  const title = meta?.title || 'TypeScript Type Challenge'
  const difficulty = meta ? (DIFFICULTY_EN[meta.difficulty] || meta.difficulty) : ''
  const difficultyColor = meta ? (DIFFICULTY_COLOR[meta.difficulty] || '#8a8f98') : '#8a8f98'
  const tags = (meta?.tags || []).slice(0, 4)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#08090a',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle indigo glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            background:
              'radial-gradient(ellipse 720px 420px at 18% 0%, rgba(94,106,210,0.28) 0%, transparent 70%)',
          }}
        />

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              fontWeight: 700,
              color: '#f7f8f8',
              letterSpacing: '-0.02em',
            }}
          >
            Type<span style={{ color: '#5e6ad2' }}>Skill</span>
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#8a8f98',
              fontWeight: 400,
            }}
          >
            — 190 challenges, Easy to Extreme
          </div>
        </div>

        {/* Title + meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative' }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: '#f7f8f8',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              display: 'flex',
            }}
          >
            {title}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {difficulty && (
              <div
                style={{
                  display: 'flex',
                  fontSize: 22,
                  fontWeight: 600,
                  color: difficultyColor,
                  padding: '6px 18px',
                  borderRadius: 8,
                  border: `1px solid ${difficultyColor}44`,
                  background: `${difficultyColor}14`,
                }}
              >
                {difficulty}
              </div>
            )}
            {tags.map((t) => (
              <div
                key={t}
                style={{
                  display: 'flex',
                  fontSize: 20,
                  color: '#8a8f98',
                  padding: '6px 16px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                  fontFamily: 'monospace',
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            fontSize: 20,
            color: '#62666d',
          }}
        >
          <div style={{ display: 'flex', fontFamily: 'monospace' }}>type-skill.vercel.app</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#5e6ad2', fontSize: 26 }}>{'<>'}</span>
            <span>TypeScript type challenges</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
