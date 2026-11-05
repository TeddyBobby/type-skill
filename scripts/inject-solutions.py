#!/usr/bin/env python3
"""Inject verified solutions + explanations into data/solutions.json (idempotent).

答案独立存放在 solutions.json（仅服务端读取），challenges.json 只保留 hasSolution 标记，
避免题解被打包进客户端 bundle 造成泄题。
"""
import json
import os

DATA_DIR = '/Users/moyizhi/projects/type-dojo/data'
PATH = os.path.join(DATA_DIR, 'challenges.json')
SOLUTIONS_PATH = os.path.join(DATA_DIR, 'solutions.json')

SOLUTIONS = {
    "3243": (
        "type FlattenDepth<T extends any[], D extends number = 1, A extends any[] = []> = A['length'] extends D ? T : T extends [infer F, ...infer R] ? (F extends any[] ? [...FlattenDepth<F, D, [...A, 0]>, ...FlattenDepth<R, D, A>] : [F, ...FlattenDepth<R, D, A>]) : T",
        "1. 用计数器 `A['length']` 记录已展开的层数，达到 D 即停止\\n2. 元素是数组则展开一层并让计数器 +1，否则原样保留\\n3. 递归处理首元素与剩余部分，展开结果用元组展开拼接",
    ),
    "4260": (
        "type StringToUnion<S extends string> = S extends `${infer F}${infer R}` ? F | StringToUnion<R> : never\ntype AllCombinations<S extends string, U extends string = StringToUnion<S>> = [U] extends [never] ? '' : '' | { [K in U]: `${K}${AllCombinations<'', Exclude<U, K>>}` }[U]",
        "1. `StringToUnion` 把字符串逐字符拆成字符联合\\n2. 遍历每个字符 K 作为首字符，递归拼接剩余字符的全排列\\n3. `''` 作为空串兜底，`[U] extends [never]` 终止递归（避免对 never 分发）",
    ),
    "8767": (
        "type Combination<T extends string[], All = T[number], Item = All> = Item extends string ? Item | `${Item} ${Combination<[], Exclude<All, Item>>}` : never",
        "1. `T[number]` 取出所有单词的联合 All，`Item extends string` 对其逐成员分发\\n2. 每个 Item 要么单独出现，要么与剩余单词的组合用空格拼接\\n3. `Exclude<All, Item>` 保证同一单词不重复使用，递归直到为空",
    ),
    "8987": (
        "type Subsequence<T extends any[]> = T extends [infer F, ...infer R] ? [F, ...Subsequence<R>] | Subsequence<R> : []",
        "1. 对首元素 F 做两种选择：包含（`[F, ...Subsequence<R>]`）或不包含（`Subsequence<R>`）\\n2. 两者取并集即可枚举所有子序列\\n3. 空数组返回 `[]`，递归终止",
    ),
    "9616": (
        "type ParseUrlParams<T extends string> = T extends `${string}:${infer Param}` ? (Param extends `${infer Name}/${infer Rest}` ? Name | ParseUrlParams<Rest> : Param) : never",
        "1. 用 `${string}:${infer Param}` 捕获第一个 `:param` 段\\n2. 若 Param 里还有 `/`，拆出参数名 Name 并对 Rest 递归解析\\n3. 不含冒号则返回 `never`，多个参数取并集",
    ),
    "21106": (
        "type Combs<T extends string[]> = T extends [infer F extends string, ...infer R extends string[]] ? `${F} ${R[number]}` | Combs<R> : never",
        "1. 取首元素 F，与剩余每个元素用模板字面量拼成两两组合\\n2. 递归处理剩余数组，直到只剩一个元素\\n3. `R[number]` 取剩余元素联合，剩余为空时组合自然坍缩为 `never`",
    ),
    "27152": (
        "type Triangular<N extends number, I extends unknown[] = [], Sum extends unknown[] = []> = I['length'] extends N ? Sum['length'] : Triangular<N, [...I, unknown], [...Sum, ...I, unknown]>",
        "1. 用元组长度模拟自然数，`I` 从 0 递增到 N\\n2. 每轮把长度等于 `I+1` 的元组 `[...I, unknown]` 追加进 `Sum`\\n3. I 到达 N 时返回 `Sum['length']`，即 1+2+…+N",
    ),
    "29650": (
        "type ExtractToObject<T, U extends keyof T> = { [P in keyof (Omit<T, U> & T[U])]: (Omit<T, U> & T[U])[P] }",
        "1. `Omit<T, U>` 去掉指定键，`T[U]` 取出该键的值\\n2. 两者交叉把嵌套对象「摊平」到顶层\\n3. 用映射类型 `{ [P in keyof ...]: ... }` 展平交叉类型，`Equal` 才能判等",
    ),
    "29785": (
        "type DeepOmit<T, K extends string> = K extends `${infer Head}.${infer Rest}` ? (Head extends keyof T ? { [P in keyof T]: P extends Head ? DeepOmit<T[P], Rest> : T[P] } : T) : (K extends keyof T ? { [P in keyof T as P extends K ? never : P]: T[P] } : T)",
        "1. 路径含 `.` 时拆成 `Head` 和 `Rest`，对 `T[Head]` 递归删除 `Rest`\\n2. 末段键用 `as` 键重映射把目标键映射为 `never` 实现删除\\n3. 键不存在时原样返回 T（幂等）",
    ),
    "30430": (
        "type BuildArr<N extends number, A extends unknown[] = []> = A['length'] extends N ? A : BuildArr<N, [...A, unknown]>\ntype Dec<N extends number> = BuildArr<N> extends [...infer Rest, unknown] ? Rest['length'] : 0\ntype Hanoi<N extends number, From = 'A', To = 'B', Intermediate = 'C'> = N extends 0 ? [] : N extends 1 ? [[From, To]] : [...Hanoi<Dec<N>, From, Intermediate, To>, [From, To], ...Hanoi<Dec<N>, Intermediate, To, From>]",
        "1. `Dec` 用元组去掉末元素实现 N-1（类型层没有减法）\\n2. 经典汉诺塔递归：先把 N-1 片移到中转柱，再移最大片，最后把 N-1 片移到目标柱\\n3. 移动用 `[From, To]` 元组表示，拼接成完整移动序列；N=0 返回空、N=1 直接一步",
    ),
    "34857": (
        "type Merge<A, B> = B extends any ? { [P in keyof A | keyof B]: P extends keyof B ? B[P] : P extends keyof A ? A[P] : never } : never\ntype DefinedPartial<T, U extends keyof T = keyof T> = [U] extends [never] ? never : { [K in U]: { [P in K]: T[P] } | Merge<{ [P in K]: T[P] }, DefinedPartial<T, Exclude<U, K>>> }[U]",
        "1. 每个键 K 都有「单独入选」与「和其余子集合并」两种选择\\n2. `Merge` 把两个对象合并成扁平对象（交叉类型 `Equal` 判不等，需展开）\\n3. `[U] extends [never]` 终止递归，遍历 `keyof T` 收集所有非空子集并集",
    ),
    "35191": (
        "type Trace<T extends any[][], Acc extends unknown[] = []> = T extends [infer Row extends any[], ...infer Rows extends any[][]] ? Row[Acc['length']] | Trace<Rows, [...Acc, unknown]> : never",
        "1. 用 `Acc['length']` 记录当前行号（也是对角线的列下标）\\n2. 取第 i 行第 i 列元素 `Row[Acc['length']]`\\n3. 递归处理剩余行，`Acc` 每轮递增，所有对角线元素取并集",
    ),
}

with open(PATH, encoding='utf-8') as f:
    data = json.load(f)

solutions = {}
if os.path.exists(SOLUTIONS_PATH):
    with open(SOLUTIONS_PATH, encoding='utf-8') as f:
        solutions = json.load(f)

by_id = {c['id']: c for c in data}
applied = 0
for cid, (sol, exp) in SOLUTIONS.items():
    c = by_id.get(cid)
    if c is None:
        print(f'WARN: challenge {cid} not found')
        continue
    if cid in solutions:
        print(f'SKIP {cid}: already has solution')
        continue
    solutions[cid] = {'solutionCode': sol, 'solutionExplanation': exp}
    c['hasSolution'] = True
    applied += 1

with open(SOLUTIONS_PATH, 'w', encoding='utf-8') as f:
    json.dump(solutions, f, ensure_ascii=False, indent=2)

with open(PATH, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Applied {applied} solutions')
