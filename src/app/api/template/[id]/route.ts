import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

export const runtime = 'nodejs'

const QUESTIONS_DIR = join(process.cwd(), 'data', 'questions')

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const entries = readdirSync(QUESTIONS_DIR)
  const dirName = entries.find((e) => {
    const num = e.split('-')[0].replace(/^0+/, '')
    return num === id
  })

  if (!dirName) {
    return NextResponse.json({ error: '模板不存在' }, { status: 404 })
  }

  const templatePath = join(QUESTIONS_DIR, dirName, 'template.ts')
  if (!existsSync(templatePath)) {
    return NextResponse.json({ error: '模板文件不存在' }, { status: 404 })
  }

  const content = readFileSync(templatePath, 'utf-8')
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
