#!/usr/bin/env python3
"""Verify a type-challenge solution against its test cases using tsc."""
import sys, os, subprocess, tempfile, re

ROOT = os.path.expanduser('~/projects/type-dojo')
QDIR = os.path.join(ROOT, 'data', 'questions')
TUTILS = os.path.join(ROOT, 'data', 'test-utils.ts')
TSC = os.path.join(ROOT, 'node_modules', '.bin', 'tsc')

def verify(dirname: str, solution: str) -> tuple[bool, str]:
    test_cases = open(os.path.join(QDIR, dirname, 'test-cases.ts')).read()
    tutils = open(TUTILS).read()
    # mirror type-checker.ts: replace the import and inject IsAny/NotAny only when imported
    HELPER_TYPES = {
        'IsAny': 'type IsAny<T> = 0 extends (1 & T) ? true : false',
        'NotAny': 'type NotAny<T> = true extends IsAny<T> ? false : true',
    }
    HELPER_ORDER = ['IsAny', 'NotAny']

    def repl(m):
        names = m.group(1)
        imported = {n.strip() for n in names.split(',')}
        if 'NotAny' in imported:
            imported.add('IsAny')
        injected = '\n'.join(HELPER_TYPES[n] for n in HELPER_ORDER if n in imported)
        return '// type-challenges utils loaded from test-utils\n' + (injected + '\n' if injected else '')

    test_cases = re.sub(
        r"import\s+type\s+\{([^}]+)\}\s+from\s+['\"]@type-challenges/utils['\"];?\s*",
        repl,
        test_cases,
    )
    combined = tutils + '\n' + solution + '\n' + test_cases
    with tempfile.NamedTemporaryFile('w', suffix='.ts', delete=False) as f:
        f.write(combined)
        tmp = f.name
    try:
        p = subprocess.run(
            [TSC, '--noEmit', '--strict', '--skipLibCheck', '--target', 'ESNext',
             '--moduleResolution', 'NodeNext', '--module', 'NodeNext', tmp],
            capture_output=True, text=True,
        )
        out = p.stdout + p.stderr
        # filter errors to only those in the temp file (not lib)
        errs = [l for l in out.splitlines() if 'error TS' in l and tmp in l]
        return (p.returncode == 0, '\n'.join(errs) if errs else out)
    finally:
        os.unlink(tmp)

if __name__ == '__main__':
    dirname = sys.argv[1]
    solution = sys.argv[2] if len(sys.argv) > 2 else open(os.path.join(QDIR, dirname, 'template.ts')).read()
    ok, msg = verify(dirname, solution)
    print('PASS' if ok else 'FAIL')
    if msg:
        print(msg[:2000])
