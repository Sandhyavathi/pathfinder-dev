import { useState, useCallback } from 'react';

interface ExecutionResult {
  output: string;
  error?: string;
  exitCode: number;
  timestamp: Date;
}

interface UseCodeExecutionReturn {
  isExecuting: boolean;
  lastResult: ExecutionResult | null;
  executionHistory: ExecutionResult[];
  executeCode: (code: string, language: string) => Promise<ExecutionResult>;
  clearHistory: () => void;
}

export function useCodeExecution(): UseCodeExecutionReturn {
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastResult, setLastResult] = useState<ExecutionResult | null>(null);
  const [executionHistory, setExecutionHistory] = useState<ExecutionResult[]>([]);

  const executeCode = useCallback(async (code: string, language: string): Promise<ExecutionResult> => {
    setIsExecuting(true);

    try {
      // Mock execution - replace with actual backend API
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });

      let result: ExecutionResult;
      
      if (response.ok) {
        const data = await response.json();
        result = {
          output: data.output || 'Code executed successfully!',
          error: data.error,
          exitCode: data.exitCode || 0,
          timestamp: new Date(),
        };
      } else {
        // Mock successful execution for demo
        result = {
          output: getSimulatedOutput(code, language),
          exitCode: 0,
          timestamp: new Date(),
        };
      }

      setLastResult(result);
      setExecutionHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results

      return result;
    } catch (error) {
      const errorResult: ExecutionResult = {
        output: '',
        error: error instanceof Error ? error.message : 'Execution failed',
        exitCode: 1,
        timestamp: new Date(),
      };

      setLastResult(errorResult);
      setExecutionHistory(prev => [errorResult, ...prev.slice(0, 9)]);

      return errorResult;
    } finally {
      setIsExecuting(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setExecutionHistory([]);
    setLastResult(null);
  }, []);

  return {
    isExecuting,
    lastResult,
    executionHistory,
    executeCode,
    clearHistory,
  };
}

function getSimulatedOutput(code: string, language: string): string {
  // Simple simulation for demo purposes
  if (language === 'python') {
    if (code.includes('print(')) {
      const matches = code.match(/print\(['"](.*?)['"]\)/g);
      if (matches) {
        return matches.map(match => {
          const content = match.match(/print\(['"](.*?)['"]\)/);
          return content ? content[1] : '';
        }).join('\n');
      }
    }
    return 'Python code executed successfully!';
  }

  if (language === 'javascript') {
    if (code.includes('console.log(')) {
      const matches = code.match(/console\.log\(['"](.*?)['"]\)/g);
      if (matches) {
        return matches.map(match => {
          const content = match.match(/console\.log\(['"](.*?)['"]\)/);
          return content ? content[1] : '';
        }).join('\n');
      }
    }
    return 'JavaScript code executed successfully!';
  }

  return `${language} code executed successfully!`;
}