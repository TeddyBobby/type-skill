// 题目元数据
export interface ChallengeMeta {
  id: string
  dirname: string
  title: string
  titleCN: string
  difficulty: 'warm' | 'easy' | 'medium' | 'hard' | 'extreme'
  tags: string[]
  description: string
  example: string
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
