import { NextRequest, NextResponse } from 'next/server'
import { checkType } from '@/lib/type-checker'

export const runtime = 'nodejs'

// /api/check 会用 TypeScript Compiler API 在服务端真实编译用户代码，
// 这是全站最重的计算路径。若不对输入设限，恶意或失控的客户端可以提交
// 超大 payload，让单个请求耗尽函数的内存/CPU（资源耗尽型 DoS）。
// 一个合法的类型题解通常只有几百字节到几 KB，100 KB 已留有 20 倍以上余量。
const MAX_CODE_LENGTH = 100_000

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: '请求体不是合法的 JSON' }, { status: 400 })
  }

  const { code, challengeId } = (body ?? {}) as { code?: unknown; challengeId?: unknown }

  // 输入校验：在进入最重的编译路径之前就拦截非法请求，返回明确的 4xx。
  if (typeof code !== 'string' || code.trim().length === 0) {
    return NextResponse.json({ error: '缺少 code 参数' }, { status: 400 })
  }

  if (typeof challengeId !== 'string' || !/^\d+$/.test(challengeId)) {
    return NextResponse.json({ error: 'challengeId 必须是纯数字字符串' }, { status: 400 })
  }

  if (code.length > MAX_CODE_LENGTH) {
    return NextResponse.json(
      { error: `代码过长（${code.length} 字符），上限 ${MAX_CODE_LENGTH} 字符` },
      { status: 413 }
    )
  }

  try {
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
