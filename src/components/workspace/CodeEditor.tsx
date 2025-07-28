import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  readOnly?: boolean;
  onSave?: () => void;
}

export function CodeEditor({ value, onChange, language, readOnly = false, onSave }: CodeEditorProps) {
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editorInstance: any) => {
    editorRef.current = editorInstance;

    // Add keyboard shortcuts
    editorInstance.addCommand(2048 | 49, () => { // Ctrl+S
      onSave?.();
    });

    // Focus the editor
    editorInstance.focus();
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  // Remove the setTheme effect as it's handled by the Editor component

  const getLanguageFromExtension = (lang: string): string => {
    const languageMap: Record<string, string> = {
      'py': 'python',
      'js': 'javascript',
      'ts': 'typescript',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'go': 'go',
      'rs': 'rust',
      'php': 'php',
      'rb': 'ruby',
      'md': 'markdown',
      'json': 'json',
      'xml': 'xml',
      'html': 'html',
      'css': 'css',
      'sql': 'sql',
      'sh': 'shell',
      'yml': 'yaml',
      'yaml': 'yaml',
    };

    return languageMap[lang.toLowerCase()] || 'plaintext';
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language={getLanguageFromExtension(language)}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={theme === 'dark' ? 'vs-dark' : 'vs'}
        options={{
          readOnly,
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          folding: true,
          foldingHighlight: true,
          foldingStrategy: 'indentation',
          showFoldingControls: 'always',
          unfoldOnClickAfterEndOfLine: false,
          selectOnLineNumbers: true,
          bracketPairColorization: {
            enabled: true,
          },
          suggest: {
            enabled: true,
          },
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
          parameterHints: {
            enabled: true,
          },
          hover: {
            enabled: true,
          },
          contextmenu: true,
          mouseWheelZoom: true,
          smoothScrolling: true,
          cursorSmoothCaretAnimation: 'on',
          renderLineHighlight: 'all',
          renderWhitespace: 'selection',
          guides: {
            indentation: true,
            highlightActiveIndentation: true,
          },
        }}
      />
    </div>
  );
}