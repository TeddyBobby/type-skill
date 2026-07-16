import { NextRequest, NextResponse } from 'next/server'
import { checkType } from '@/lib/type-checker'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, challengeId } = body

    if (!code || !challengeId) {
      return NextResponse.json(
        { error: '缺少 code 或 challengeId 参数' },
        { status: 400 }
      )
    }

    const result = checkType(challengeId, code)
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : '未知错误'
    return NextResponse.json(
      { error: `类型检查失败: ${message}` },
      { status: 500 }
    )
  }
}
