#!/usr/bin/env python3
"""Bulk-verify candidate solutions against test cases."""
import sys
sys.path.insert(0, '/Users/moyizhi/projects/type-dojo/scripts')
from importlib.machinery import SourceFileLoader
v = SourceFileLoader('verify', '/Users/moyizhi/projects/type-dojo/scripts/verify-solution.py').load_module()

SOLUTIONS = {
    "00057-hard-get-required": "type GetRequired<T> = { [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K] }",
    "00059-hard-get-optional": "type GetOptional<T> = { [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K] }",
    "00089-hard-required-keys": "type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T]",
    "00090-hard-optional-keys": "type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T]",
    "00223-hard-isany": "type IsAny<T> = 0 extends (1 & T) ? true : false",
    "00300-hard-string-to-number": "type ToNumber<S extends string> = S extends `${infer N extends number}` ? N : never",
    "00270-hard-typed-get": "type Get<T, K extends string> = K extends keyof T ? T[K] : K extends `${infer L}.${infer R}` ? L extends keyof T ? Get<T[L], R> : never : never",
    "00399-hard-tuple-filter": "type FilterOut<T extends any[], F> = T extends [infer R, ...infer Rest] ? ([R] extends [F] ? FilterOut<Rest, F> : [R, ...FilterOut<Rest, F>]) : []",
    "02828-hard-classpublickeys": "type ClassPublicKeys<T> = keyof T",
    "02857-hard-isrequiredkey": "type IsRequiredKey<T, K extends keyof T> = [K] extends [keyof { [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P] }] ? true : false",
    "05181-hard-mutable-keys": "type MutableKeys<T> = { [K in keyof T]-?: Equal<{ [P in K]: T[P] }, { -readonly [P in K]: T[P] }> extends true ? K : never }[keyof T]",
    "00847-hard-string-join": "declare function join<D extends string>(delimiter: D): <P extends string[]>(...parts: P) => Join<D, P>\ntype Join<D extends string, P extends string[]> = P extends [infer F extends string, ...infer R extends string[]] ? (R extends [] ? F : `${F}${D}${Join<D, R>}`) : ''",
    "02949-hard-objectfromentries": "type ObjectFromEntries<T extends [PropertyKey, unknown]> = { [K in T[0]]: T extends [K, infer V] ? V : never }",
    "04037-hard-ispalindrome": "type IsPalindrome<T extends string | number> = `${T}` extends Reverse<`${T}`> ? true : false\ntype Reverse<S extends string> = S extends `${infer F}${infer R}` ? `${Reverse<R>}${F}` : ''",
}

allpass = True
for d, s in SOLUTIONS.items():
    ok, msg = v.verify(d, s)
    print(('PASS' if ok else 'FAIL'), d)
    if not ok:
        allpass = False
        for line in msg.splitlines()[:4]:
            print('   ', line.strip()[:160])
print('ALL PASS' if allpass else 'SOME FAILED')
