// 难度标签与配色 —— 独立于 challenges.json 的轻量常量模块。
// 客户端组件（答题页、题库页）需要难度中文标签渲染 badge，
// 若从 challenges.ts 引入会连带把整份 challenges.json 打进 client bundle。
// 因此抽离到无副作用的小模块，客户端只 import 这里。
export const DIFFICULTY_LABELS: Record<string, string> = {
  warm: '热身',
  easy: '简单',
  medium: '中等',
  hard: '困难',
  extreme: '地狱',
}

export const DIFFICULTY_COLORS: Record<string, string> = {
  warm: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
  easy: 'text-green-400 bg-green-500/10 border-green-500/20',
  medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  hard: 'text-red-400 bg-red-500/10 border-red-500/20',
  extreme: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
}
