import React, { useState, useCallback, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Save, Settings, X, Plus } from 'lucide-react';
import { FileExplorer } from './FileExplorer';
import { CodeEditor } from './CodeEditor';
import { TerminalPanel } from './TerminalPanel';
import { ChatInterface } from './ChatInterface';
import { useFileSystem, FileNode } from '@/hooks/useFileSystem';
import { useCodeExecution } from '@/hooks/useCodeExecution';
import { useToast } from '@/hooks/use-toast';

interface ProjectWorkspaceProps {
  projectName?: string;
  currentStep?: string;
  progress?: number;
}

export function ProjectWorkspace({ 
  projectName = "Task Manager API", 
  currentStep = "Setting up project structure",
  progress = 25 
}: ProjectWorkspaceProps) {
  const { toast } = useToast();
  const {
    files,
    activeFile,
    openFiles,
    createFile,
    createFolder,
    deleteFile,
    renameFile,
    openFile,
    closeFile,
    updateFileContent,
    saveFile,
  } = useFileSystem();

  const { executeCode, isExecuting, lastResult } = useCodeExecution();
  
  const [isSaving, setIsSaving] = useState(false);

  const handleFileClick = useCallback((file: FileNode) => {
    if (file.type === 'file') {
      openFile(file);
    }
  }, [openFile]);

  const handleEditorChange = useCallback((value: string) => {
    if (activeFile) {
      updateFileContent(activeFile.path, value);
    }
  }, [activeFile, updateFileContent]);

  const handleSaveFile = useCallback(async () => {
    if (!activeFile) return;

    setIsSaving(true);
    try {
      await saveFile(activeFile.path);
      toast({
        title: "File saved",
        description: `${activeFile.name} has been saved successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error saving file",
        description: "There was an error saving your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [activeFile, saveFile, toast]);

  const handleRunCode = useCallback(async () => {
    if (!activeFile || activeFile.type !== 'file') return;

    const language = getLanguageFromFileName(activeFile.name);
    try {
      await executeCode(activeFile.content || '', language);
      toast({
        title: "Code executed",
        description: "Check the terminal for output.",
      });
    } catch (error) {
      toast({
        title: "Execution error",
        description: "There was an error running your code.",
        variant: "destructive",
      });
    }
  }, [activeFile, executeCode, toast]);

  const getLanguageFromFileName = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension || 'text';
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey)) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            handleSaveFile();
            break;
          case 'r':
            e.preventDefault();
            handleRunCode();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSaveFile, handleRunCode]);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="h-14 border-b bg-gradient-to-r from-primary/5 to-accent/5 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-semibold text-lg">{projectName}</h1>
            <p className="text-xs text-muted-foreground">{currentStep}</p>
          </div>
          <Progress value={progress} className="w-32" />
          <Badge variant="secondary" className="text-xs">
            {progress}% Complete
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="accent"
            size="sm"
            onClick={handleRunCode}
            disabled={isExecuting || !activeFile}
            className="h-8"
          >
            <Play className="h-3 w-3 mr-1" />
            {isExecuting ? 'Running...' : 'Run'}
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSaveFile}
            disabled={isSaving || !activeFile}
            className="h-8"
          >
            <Save className="h-3 w-3 mr-1" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8">
            <Settings className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Chat */}
          <ResizablePanel defaultSize={40} minSize={30} maxSize={50}>
            <ChatInterface 
              currentProject={projectName}
              currentStep={currentStep}
            />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Right Panel - IDE */}
          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup direction="horizontal">
              {/* File Explorer */}
              <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
                <FileExplorer
                  files={files}
                  onFileClick={handleFileClick}
                  onCreateFile={createFile}
                  onCreateFolder={createFolder}
                  onDeleteFile={deleteFile}
                  onRenameFile={renameFile}
                />
              </ResizablePanel>
              
              <ResizableHandle />
              
              {/* Editor Area */}
              <ResizablePanel defaultSize={75}>
                <ResizablePanelGroup direction="vertical">
                  {/* Code Editor */}
                  <ResizablePanel defaultSize={70} minSize={50}>
                    <div className="h-full flex flex-col">
                      {/* File Tabs */}
                      {openFiles.length > 0 && (
                        <div className="border-b bg-muted/20">
                          <Tabs value={activeFile?.path} className="w-full">
                            <div className="flex items-center overflow-x-auto">
                              <TabsList className="h-10 bg-transparent rounded-none justify-start flex-nowrap">
                                {openFiles.map((file) => (
                                  <TabsTrigger
                                    key={file.path}
                                    value={file.path}
                                    onClick={() => openFile(file)}
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary relative group pr-8"
                                  >
                                    <span className="text-sm truncate max-w-32">
                                      {file.name}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        closeFile(file.path);
                                      }}
                                      className="absolute right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100"
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </TabsTrigger>
                                ))}
                              </TabsList>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => createFile('new-file.py')}
                                className="ml-2 h-8 w-8 p-0 flex-shrink-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </Tabs>
                        </div>
                      )}
                      
                      {/* Editor */}
                      <div className="flex-1">
                        {activeFile ? (
                          <CodeEditor
                            value={activeFile.content || ''}
                            onChange={handleEditorChange}
                            language={getLanguageFromFileName(activeFile.name)}
                            onSave={handleSaveFile}
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-muted-foreground">
                            <div className="text-center">
                              <p className="text-lg mb-2">No file selected</p>
                              <p className="text-sm">Open a file from the explorer to start coding</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </ResizablePanel>
                  
                  <ResizableHandle />
                  
                  {/* Terminal */}
                  <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                    <TerminalPanel />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}