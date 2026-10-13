// TypeScript 类型测试工具
// 参考 @type-challenges/utils

export type Expect<T extends true> = T
export type ExpectTrue<T extends true> = T
export type ExpectFalse<T extends false> = T
export type IsTrue<T extends true> = T
export type IsFalse<T extends false> = T

export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

export type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE ? true : false

// 注意：IsAny / NotAny 不在全局提供。它们与题目本身要求实现的同名类型冲突
// （例如 00223 IsAny 题目要求用户自己实现 IsAny）。改为在 type-checker.ts 中
// 按需注入：只有当测试用例 import 了这些名字时才注入对应定义。

export type Debug<T> = { [K in keyof T]: T[K] }
export type MergeInsertions<T> =
  T extends object
    ? { [K in keyof T]: MergeInsertions<T[K]> }
    : T

export type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>
