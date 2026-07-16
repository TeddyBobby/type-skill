'use client'

import { useCallback, useEffect, useState } from 'react'
import Editor, { loader } from '@monaco-editor/react'
import type { OnMount } from '@monaco-editor/react'

loader.config({ paths: { vs: '/monaco/vs' } })

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  readonly?: boolean
  light?: boolean
}

export function CodeEditor({ value, onChange, readonly, light }: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleChange = useCallback((val: string | undefined) => { onChange(val || '') }, [onChange])

  const handleMount: OnMount = useCallback((editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true, noSyntaxValidation: false, noSuggestionDiagnostics: true,
    })
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext, strict: true, noLib: true, allowNonTsExtensions: true,
    })
    editor.focus()
  }, [])

  if (!mounted) {
    return (
      <div className="h-[350px] sm:h-[450px] flex items-center justify-center text-[var(--fg-muted)] text-sm rounded-lg border" style={{ borderColor: 'var(--border)', background: light ? '#fafafa' : '#0d0d14' }}>
        加载中...
      </div>
    )
  }

  const monacoTheme = light ? 'vs' : 'vs-dark'

  return (
    <div className="rounded-lg overflow-hidden border h-[350px] sm:h-[450px]" style={{ borderColor: 'var(--border)' }}>
      <Editor
        height="100%" language="typescript" theme={monacoTheme}
        value={value} onChange={handleChange} onMount={handleMount}
        options={{
          readOnly: readonly, fontSize: 14,
          fontFamily: 'var(--font-mono), "Fira Code", monospace',
          lineNumbers: 'on', minimap: { enabled: false },
          scrollBeyondLastLine: false, wordWrap: 'on', automaticLayout: true, tabSize: 2,
          renderLineHighlight: 'line', bracketPairColorization: { enabled: true },
          padding: { top: 12, bottom: 12 }, overviewRulerBorder: false, hideCursorInOverviewRuler: true,
          scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
          smoothScrolling: true, cursorBlinking: 'smooth', cursorSmoothCaretAnimation: 'on',
          glyphMargin: false, folding: true, lineDecorationsWidth: 0, lineNumbersMinChars: 2,
        }}
        loading={
          <div className="h-full flex items-center justify-center text-[var(--fg-muted)] text-sm" style={{ background: light ? '#fafafa' : '#0d0d14' }}>
            加载中...
          </div>
        }
      />
    </div>
  )
}
