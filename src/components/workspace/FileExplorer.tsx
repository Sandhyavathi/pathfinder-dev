import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, Plus, MoreVertical, Trash2, Edit } from 'lucide-react';
import { FileNode } from '@/hooks/useFileSystem';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface FileExplorerProps {
  files: FileNode[];
  onFileClick: (file: FileNode) => void;
  onCreateFile: (name: string, parentPath?: string) => void;
  onCreateFolder: (name: string, parentPath?: string) => void;
  onDeleteFile: (path: string) => void;
  onRenameFile: (path: string, newName: string) => void;
}

interface FileItemProps {
  file: FileNode;
  onFileClick: (file: FileNode) => void;
  onCreateFile: (name: string, parentPath?: string) => void;
  onCreateFolder: (name: string, parentPath?: string) => void;
  onDeleteFile: (path: string) => void;
  onRenameFile: (path: string, newName: string) => void;
  depth?: number;
}

function FileItem({
  file,
  onFileClick,
  onCreateFile,
  onCreateFolder,
  onDeleteFile,
  onRenameFile,
  depth = 0,
}: FileItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(file.name);

  const handleRename = () => {
    if (newName && newName !== file.name) {
      onRenameFile(file.path, newName);
    }
    setIsRenaming(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setNewName(file.name);
      setIsRenaming(false);
    }
  };

  return (
    <div>
      <div
        className="flex items-center py-1 px-2 hover:bg-muted/50 cursor-pointer group"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <div className="flex items-center flex-1 min-w-0" onClick={() => onFileClick(file)}>
          {file.type === 'folder' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="mr-1 p-0.5 hover:bg-muted rounded"
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          )}
          
          {file.type === 'folder' ? (
            <Folder className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
          ) : (
            <File className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
          )}
          
          {isRenaming ? (
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyPress}
              className="h-6 text-sm py-0 px-1"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="text-sm truncate">{file.name}</span>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {file.type === 'folder' && (
              <>
                <DropdownMenuItem onClick={() => onCreateFile('new-file.py', file.path)}>
                  <File className="h-4 w-4 mr-2" />
                  New File
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCreateFolder('new-folder', file.path)}>
                  <Folder className="h-4 w-4 mr-2" />
                  New Folder
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem onClick={() => setIsRenaming(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDeleteFile(file.path)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {file.type === 'folder' && isExpanded && file.children && (
        <div>
          {file.children.map((child) => (
            <FileItem
              key={child.id}
              file={child}
              onFileClick={onFileClick}
              onCreateFile={onCreateFile}
              onCreateFolder={onCreateFolder}
              onDeleteFile={onDeleteFile}
              onRenameFile={onRenameFile}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer({
  files,
  onFileClick,
  onCreateFile,
  onCreateFolder,
  onDeleteFile,
  onRenameFile,
}: FileExplorerProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="text-sm font-semibold">Explorer</h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onCreateFile('new-file.py')}
          >
            <File className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onCreateFolder('new-folder')}
          >
            <Folder className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {files.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            onFileClick={onFileClick}
            onCreateFile={onCreateFile}
            onCreateFolder={onCreateFolder}
            onDeleteFile={onDeleteFile}
            onRenameFile={onRenameFile}
          />
        ))}
      </div>
    </div>
  );
}