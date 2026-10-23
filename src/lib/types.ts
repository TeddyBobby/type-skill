// 题目元数据（不含答案 —— 答案只在服务端，避免打包进客户端 bundle 造成泄题）
export interface ChallengeMeta {
  id: string
  dirname: string
  title: string
  titleCN: string
  difficulty: 'warm' | 'easy' | 'medium' | 'hard' | 'extreme'
  tags: string[]
  description: string
  example: string
  hasSolution: boolean
}

// 题目答案（仅服务端持有，通过 /api/solution/[id] 按需下发）
export interface ChallengeSolution {
  solutionCode: string
  solutionExplanation: string
}

// API 请求
export interface CheckRequest {
  code: string
  challengeId: string
}

// 单个测试结果
export interface TestResult {
  passed: boolean
  caseIndex: number
  message: string
}

// API 响应
export interface CheckResponse {
  success: boolean
  results: TestResult[]
  errors: { line: number; column: number; message: string }[]
}
