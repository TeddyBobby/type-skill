import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { ChallengeSolution } from '@/lib/types'

export const runtime = 'nodejs'

// 答案只在服务端持有：从 solutions.json 读取，绝不打进客户端 bundle。
// 用户点击「答案」时才按需下发，避免所有题解一次性暴露在浏览器可检查的 JS 里。
const SOLUTIONS_PATH = join(process.cwd(), 'data', 'solutions.json')
const solutions = JSON.parse(readFileSync(SOLUTIONS_PATH, 'utf-8')) as Record<string, ChallengeSolution>

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const solution = solutions[id]

  if (!solution) {
    return NextResponse.json({ error: '该题目暂无答案' }, { status: 404 })
  }

  return NextResponse.json(solution, {
    headers: {
      // 题解内容静态，可安全缓存
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
