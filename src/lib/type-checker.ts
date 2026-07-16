// TypeScript Compiler API 类型检查器
import ts from 'typescript'
import { readFileSync, existsSync, readdirSync, writeFileSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const QUESTIONS_DIR = join(process.cwd(), 'data', 'questions')
const TEST_UTILS_PATH = join(process.cwd(), 'data', 'test-utils.ts')

export interface TypeCheckResult {
  success: boolean
  results: { passed: boolean; caseIndex: number; message: string }[]
  errors: { line: number; column: number; message: string }[]
}

export function checkType(challengeId: string, userCode: string): TypeCheckResult {
  const entries = readdirSync(QUESTIONS_DIR)
  const dirName = entries.find((e) => {
    const num = e.split('-')[0].replace(/^0+/, '')
    return num === challengeId
  })

  if (!dirName) {
    return { success: false, results: [], errors: [{ line: 0, column: 0, message: `题目 ${challengeId} 不存在` }] }
  }

  const challengeDir = join(QUESTIONS_DIR, dirName)
  const testCasesPath = join(challengeDir, 'test-cases.ts')
  if (!existsSync(testCasesPath)) {
    return { success: false, results: [], errors: [{ line: 0, column: 0, message: '测试用例文件不存在' }] }
  }

  const testCasesSource = readFileSync(testCasesPath, 'utf-8')
  const testUtilsSource = readFileSync(TEST_UTILS_PATH, 'utf-8')

  const modifiedTestCases = testCasesSource.replace(
    /import\s+type\s+\{[^}]+\}\s+from\s+['"]@type-challenges\/utils['"];?\s*/,
    '// type-challenges utils loaded from test-utils\n'
  )

  const userCodeLines = userCode.split('\n').length
  const testUtilsLines = testUtilsSource.split('\n').length

  // 写入临时文件再编译（确保 TypeScript 能正确加载 lib 文件）
  const tmpFile = join(tmpdir(), `type-dojo-check-${challengeId}.ts`)
  const combinedSource = [testUtilsSource, userCode, modifiedTestCases].join('\n')
  writeFileSync(tmpFile, combinedSource, 'utf-8')

  try {
    const program = ts.createProgram([tmpFile], {
      target: ts.ScriptTarget.ESNext,
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      module: ts.ModuleKind.NodeNext,
    })

    const diagnostics = ts.getPreEmitDiagnostics(program)

    const errors: TypeCheckResult['errors'] = []
    let hasTypeErrors = false

    for (const d of diagnostics) {
      if (d.file && d.start !== undefined) {
        const { line, character } = d.file.getLineAndCharacterOfPosition(d.start)
        const message = ts.flattenDiagnosticMessageText(d.messageText, '\n')
        const actualLine = line + 1

        if (actualLine <= testUtilsLines) continue

        const userCodeEndLine = testUtilsLines + userCodeLines
        const source = actualLine <= userCodeEndLine ? '（你的代码）' : '（测试用例）'

        hasTypeErrors = true
        errors.push({
          line: actualLine,
          column: character + 1,
          message: `TS${d.code}: ${message}${source}`,
        })
      }
    }

    const results = parseTestResults(testCasesSource, !hasTypeErrors)
    return { success: !hasTypeErrors, results, errors }
  } finally {
    // 清理临时文件
    try { unlinkSync(tmpFile) } catch {}
  }
}

function parseTestResults(
  testSource: string,
  allPassed: boolean
): { passed: boolean; caseIndex: number; message: string }[] {
  const results: { passed: boolean; caseIndex: number; message: string }[] = []
  const lines = testSource.split('\n')
  let caseIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()

    // 检测 ts-expect-error 注释
    if (trimmed.startsWith('// @ts-expect-error')) {
      caseIndex++
      let desc = ''
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim()
        const match = nextLine.match(/\/\/\s*(.+)/)
        if (match) desc = match[1]
        else desc = nextLine.substring(0, 40).replace(/\/\/.*/, '').trim()
      }
      results.push({ passed: allPassed, caseIndex, message: desc || '应触发类型错误' })
      continue
    }

    if (i > 0 && lines[i - 1].trim().startsWith('// @ts-expect-error')) continue

    if (trimmed.includes('Expect<') && !trimmed.startsWith('//')) {
      caseIndex++
      let desc = `Case ${caseIndex}`
      const commentMatch = trimmed.match(/\/\/\s*(.+)/)
      if (commentMatch) desc = commentMatch[1]
      else if (trimmed.includes('Expect<Equal<')) desc = `Case ${caseIndex}: 类型相等验证`
      else desc = `Case ${caseIndex}: 类型验证`
      results.push({ passed: allPassed, caseIndex, message: desc })
    }
  }

  return results
}
