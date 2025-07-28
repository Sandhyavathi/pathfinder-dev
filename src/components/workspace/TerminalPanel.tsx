import React, { useRef, useEffect, useState } from 'react';
import { Terminal } from 'xterm';
import { Button } from '@/components/ui/button';
import { Play, Square, Trash2, Settings } from 'lucide-react';

interface TerminalPanelProps {
  onCommand?: (command: string) => Promise<string>;
}

export function TerminalPanel({ onCommand }: TerminalPanelProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        cursor: 'hsl(var(--primary))',
      },
      fontSize: 14,
      fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
      rows: 20,
      cols: 80,
    });

    term.open(terminalRef.current);

    // Welcome message
    term.writeln('Welcome to Backend Development Terminal');
    term.writeln('Type your commands here or use the Run button to execute code.');
    term.writeln('');
    term.write('$ ');

    let currentLine = '';

    term.onData((data) => {
      if (data === '\r') {
        // Enter key
        term.writeln('');
        if (currentLine.trim()) {
          executeCommand(currentLine.trim());
        }
        currentLine = '';
        term.write('$ ');
      } else if (data === '\u007f') {
        // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          term.write('\b \b');
        }
      } else if (data >= ' ') {
        // Printable characters
        currentLine += data;
        term.write(data);
      }
    });

    const executeCommand = async (command: string) => {
      setIsRunning(true);
      setCurrentCommand(command);

      try {
        let output: string;
        
        if (onCommand) {
          output = await onCommand(command);
        } else {
          // Mock command execution
          output = await mockCommandExecution(command);
        }

        if (output) {
          term.writeln(output);
        }
      } catch (error) {
        term.writeln(`Error: ${error instanceof Error ? error.message : 'Command failed'}`);
      } finally {
        setIsRunning(false);
        setCurrentCommand('');
      }
    };

    setTerminal(term);

    return () => {
      term.dispose();
    };
  }, [onCommand]);

  const clearTerminal = () => {
    if (terminal) {
      terminal.clear();
      terminal.write('$ ');
    }
  };

  const runCurrentFile = async () => {
    if (terminal) {
      setIsRunning(true);
      terminal.writeln('python main.py');
      
      try {
        const output = await mockCommandExecution('python main.py');
        terminal.writeln(output);
      } catch (error) {
        terminal.writeln(`Error: ${error instanceof Error ? error.message : 'Execution failed'}`);
      } finally {
        setIsRunning(false);
      }
      
      terminal.write('$ ');
    }
  };

  const stopExecution = () => {
    if (terminal) {
      terminal.writeln('^C');
      terminal.writeln('Process interrupted');
      terminal.write('$ ');
      setIsRunning(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex items-center justify-between p-2 border-b bg-muted/20">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={runCurrentFile}
            disabled={isRunning}
            className="h-7"
          >
            <Play className="h-3 w-3 mr-1" />
            Run
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={stopExecution}
            disabled={!isRunning}
            className="h-7"
          >
            <Square className="h-3 w-3 mr-1" />
            Stop
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearTerminal}
            className="h-7"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {isRunning && (
            <span className="text-xs text-muted-foreground">
              Running: {currentCommand}
            </span>
          )}
          
          <Button variant="ghost" size="sm" className="h-7">
            <Settings className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-2">
        <div ref={terminalRef} className="h-full w-full" />
      </div>
    </div>
  );
}

async function mockCommandExecution(command: string): Promise<string> {
  // Simulate execution delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

  const responses: Record<string, string> = {
    'ls': 'main.py  api.py  README.md',
    'pwd': '/workspace/project',
    'python main.py': 'Hello, World!\nPython script executed successfully!',
    'python api.py': 'Flask app starting...\n * Running on http://127.0.0.1:5000\n * Debug mode: on',
    'pip list': 'Package    Version\n---------- -------\nFlask      2.3.3\nrequests   2.31.0',
    'python --version': 'Python 3.11.5',
    'node --version': 'v18.17.0',
    'npm --version': '9.6.7',
    'git status': 'On branch main\nnothing to commit, working tree clean',
    'help': 'Available commands:\n  ls, pwd, python, pip, node, npm, git\n  Type any command to see simulated output',
  };

  const lowerCommand = command.toLowerCase();
  
  for (const [cmd, response] of Object.entries(responses)) {
    if (lowerCommand.includes(cmd)) {
      return response;
    }
  }

  if (lowerCommand.startsWith('python ') && lowerCommand.includes('.py')) {
    return 'Script executed successfully!\n(This is a simulated output)';
  }

  if (lowerCommand.startsWith('pip install')) {
    const package_name = command.split(' ')[2] || 'package';
    return `Collecting ${package_name}\nInstalling collected packages: ${package_name}\nSuccessfully installed ${package_name}`;
  }

  return `Command '${command}' executed.\n(This is a simulated terminal - connect to a real backend for actual execution)`;
}