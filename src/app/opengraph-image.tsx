import { ImageResponse } from 'next/og'

export const alt = 'TypeSkill — TypeScript type challenges'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
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
          <div style={{ fontSize: 18, color: '#8a8f98', fontWeight: 400 }}>
            — 190 challenges, Easy to Extreme
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative' }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: '#f7f8f8',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              display: 'flex',
            }}
          >
            Master TypeScript
            <br />
            <span style={{ color: '#5e6ad2' }}>type challenges</span>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            {['190 challenges', '5 levels', 'Server-compiled', 'Free'].map((label) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  fontSize: 20,
                  color: '#8a8f98',
                  padding: '6px 16px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                {label}
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
