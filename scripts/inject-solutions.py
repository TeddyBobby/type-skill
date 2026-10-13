#!/usr/bin/env python3
"""Inject verified solutions + explanations into challenges.json (idempotent)."""
import json

PATH = '/Users/moyizhi/projects/type-dojo/data/challenges.json'

SOLUTIONS = {
    "57": (
        "type GetRequired<T> = { [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K] }",
        "1. 用 `Required<T>` 让所有属性变为必选\n2. 若 `T[K]` 与 `Required<T>[K]` 相同，说明 K 原本就是必选\n3. 用 `as` 键重映射过滤出必选键",
    ),
    "59": (
        "type GetOptional<T> = { [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K] }",
        "1. 用 `Required<T>` 让所有属性变为必选\n2. 若 `T[K]` 与 `Required<T>[K]` 不同，说明 K 原本是可选\n3. 用 `as` 键重映射过滤出可选键",
    ),
    "89": (
        "type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T]",
        "1. `{} extends Pick<T, K>` 为真当且仅当 K 是可选键\n2. 遍历 `keyof T`，用 `-?` 移除可选性以便索引\n3. 必选键保留 K，可选键置为 `never`，最后 `[keyof T]` 收集联合",
    ),
    "90": (
        "type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T]",
        "1. `{} extends Pick<T, K>` 为真当且仅当 K 是可选键\n2. 遍历 `keyof T`，用 `-?` 移除可选性以便索引\n3. 可选键保留 K，必选键置为 `never`，最后 `[keyof T]` 收集联合",
    ),
    "223": (
        "type IsAny<T> = 0 extends (1 & T) ? true : false",
        "1. `1 & T`：若 T 是 `any`，交叉结果为 `any`；否则按 T 收缩\n2. `0 extends any` 为真，`0 extends 具体类型` 为假\n3. 因此只有 `any` 会让 `0 extends (1 & T)` 成立",
    ),
    "270": (
        "type Get<T, K extends string> = K extends keyof T ? T[K] : K extends `${infer L}.${infer R}` ? L extends keyof T ? Get<T[L], R> : never : never",
        "1. 先判断 K 是否是 T 的直接键（含 `'foo.baz'` 这种字面键）\n2. 否则按 `${infer L}.${infer R}` 拆成首段和剩余路径\n3. 递归对 `T[L]` 处理剩余路径 R",
    ),
    "300": (
        "type ToNumber<S extends string> = S extends `${infer N extends number}` ? N : never",
        "1. 用 `${infer N extends number}` 尝试把字符串解析为数字字面量\n2. 解析成功返回 N，否则返回 `never`\n3. `'18@7_$%'` 这类非法数字无法匹配，得到 `never`",
    ),
    "399": (
        "type FilterOut<T extends any[], F> = T extends [infer R, ...infer Rest] ? ([R] extends [F] ? FilterOut<Rest, F> : [R, ...FilterOut<Rest, F>]) : []",
        "1. 用 `[R] extends [F]` 而非 `R extends F`，避免对联合类型分发\n2. 匹配到 F 的元素跳过，否则保留\n3. 递归处理剩余元素，直到元组为空",
    ),
    "847": (
        "declare function join<D extends string>(delimiter: D): <P extends string[]>(...parts: P) => Join<D, P>\ntype Join<D extends string, P extends string[]> = P extends [infer F extends string, ...infer R extends string[]] ? (R extends [] ? F : `${F}${D}${Join<D, R>}`) : ''",
        "1. `join(delimiter)` 返回一个接收任意字符串参数的函数\n2. `Join` 递归：单元素直接返回，多元素用 D 分隔拼接\n3. 空参数列表返回空字符串",
    ),
    "2828": (
        "type ClassPublicKeys<T> = keyof T",
        "1. `keyof` 只会取到 public 成员\n2. protected 和 private 成员对 `keyof` 不可见\n3. 因此直接 `keyof T` 即得到所有公有键",
    ),
    "2857": (
        "type IsRequiredKey<T, K extends keyof T> = [K] extends [keyof { [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P] }] ? true : false",
        "1. 先用键重映射算出所有必选键的联合\n2. 用 `[K] extends [...]` 避免对联合 K 分发\n3. K 整体是必选键的子集才返回 true",
    ),
    "2949": (
        "type ObjectFromEntries<T extends [PropertyKey, unknown]> = { [K in T[0]]: T extends [K, infer V] ? V : never }",
        "1. 用 `T[0]` 提取所有键组成映射键\n2. 对每个键 K，在 T 中查找匹配的元组并 `infer` 出值 V\n3. 生成 `{ 键: 值 }` 的对象类型",
    ),
    "4037": (
        "type IsPalindrome<T extends string | number> = `${T}` extends Reverse<`${T}`> ? true : false\ntype Reverse<S extends string> = S extends `${infer F}${infer R}` ? `${Reverse<R>}${F}` : ''",
        "1. 用模板字面量把 T 统一转为字符串\n2. `Reverse` 递归反转字符串\n3. 正反相等即回文",
    ),
    "5181": (
        "type MutableKeys<T> = { [K in keyof T]-?: Equal<{ [P in K]: T[P] }, { -readonly [P in K]: T[P] }> extends true ? K : never }[keyof T]",
        "1. `{ [P in K]: T[P] }` 保留 readonly，`{ -readonly ... }` 移除 readonly\n2. 两者相等说明 K 原本不是 readonly，即可变键\n3. 用 `Equal` 判断相等，`[keyof T]` 收集联合",
    ),
}

with open(PATH, encoding='utf-8') as f:
    data = json.load(f)

by_id = {c['id']: c for c in data}
applied = 0
for cid, (sol, exp) in SOLUTIONS.items():
    c = by_id.get(cid)
    if c is None:
        print(f'WARN: challenge {cid} not found')
        continue
    if c.get('solutionCode'):
        print(f'SKIP {cid}: already has solution')
        continue
    c['solutionCode'] = sol
    c['solutionExplanation'] = exp
    applied += 1

with open(PATH, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Applied {applied} solutions')
