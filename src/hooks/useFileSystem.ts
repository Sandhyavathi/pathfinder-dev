import { useState, useCallback } from 'react';

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  path: string;
}

interface UseFileSystemReturn {
  files: FileNode[];
  activeFile: FileNode | null;
  openFiles: FileNode[];
  createFile: (name: string, parentPath?: string) => void;
  createFolder: (name: string, parentPath?: string) => void;
  deleteFile: (path: string) => void;
  renameFile: (path: string, newName: string) => void;
  openFile: (file: FileNode) => void;
  closeFile: (path: string) => void;
  updateFileContent: (path: string, content: string) => void;
  saveFile: (path: string) => Promise<void>;
}

export function useFileSystem(): UseFileSystemReturn {
  const [files, setFiles] = useState<FileNode[]>([
    {
      id: '1',
      name: 'src',
      type: 'folder',
      path: '/src',
      children: [
        {
          id: '2',
          name: 'main.py',
          type: 'file',
          content: '# Welcome to your backend development workspace!\n# Start coding here...\n\nprint("Hello, World!")\n',
          path: '/src/main.py',
        },
        {
          id: '3',
          name: 'api.py',
          type: 'file',
          content: 'from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef hello():\n    return "Hello from Flask!"\n\nif __name__ == "__main__":\n    app.run(debug=True)\n',
          path: '/src/api.py',
        },
      ],
    },
    {
      id: '4',
      name: 'README.md',
      type: 'file',
      content: '# Backend Development Project\n\nThis is your workspace for learning backend development.\n\n## Getting Started\n\n1. Explore the files in the left panel\n2. Open files to edit them\n3. Use the terminal to run your code\n4. Chat with your AI mentor for help\n',
      path: '/README.md',
    },
  ]);

  const [activeFile, setActiveFile] = useState<FileNode | null>(null);
  const [openFiles, setOpenFiles] = useState<FileNode[]>([]);

  const findFileByPath = useCallback((path: string, fileList: FileNode[] = files): FileNode | null => {
    for (const file of fileList) {
      if (file.path === path) {
        return file;
      }
      if (file.children) {
        const found = findFileByPath(path, file.children);
        if (found) return found;
      }
    }
    return null;
  }, [files]);

  const updateFileInTree = useCallback((path: string, updater: (file: FileNode) => FileNode, fileList: FileNode[]): FileNode[] => {
    return fileList.map(file => {
      if (file.path === path) {
        return updater(file);
      }
      if (file.children) {
        return {
          ...file,
          children: updateFileInTree(path, updater, file.children),
        };
      }
      return file;
    });
  }, []);

  const createFile = useCallback((name: string, parentPath: string = '/') => {
    const newFile: FileNode = {
      id: Date.now().toString(),
      name,
      type: 'file',
      content: '',
      path: `${parentPath}/${name}`.replace(/\/+/g, '/'),
    };

    if (parentPath === '/') {
      setFiles(prev => [...prev, newFile]);
    } else {
      setFiles(prev => updateFileInTree(parentPath, (folder) => ({
        ...folder,
        children: [...(folder.children || []), newFile],
      }), prev));
    }
  }, [updateFileInTree]);

  const createFolder = useCallback((name: string, parentPath: string = '/') => {
    const newFolder: FileNode = {
      id: Date.now().toString(),
      name,
      type: 'folder',
      children: [],
      path: `${parentPath}/${name}`.replace(/\/+/g, '/'),
    };

    if (parentPath === '/') {
      setFiles(prev => [...prev, newFolder]);
    } else {
      setFiles(prev => updateFileInTree(parentPath, (folder) => ({
        ...folder,
        children: [...(folder.children || []), newFolder],
      }), prev));
    }
  }, [updateFileInTree]);

  const deleteFile = useCallback((path: string) => {
    const removeFromTree = (fileList: FileNode[]): FileNode[] => {
      return fileList.filter(file => {
        if (file.path === path) {
          return false;
        }
        if (file.children) {
          file.children = removeFromTree(file.children);
        }
        return true;
      });
    };

    setFiles(prev => removeFromTree(prev));
    setOpenFiles(prev => prev.filter(file => file.path !== path));
    if (activeFile?.path === path) {
      setActiveFile(openFiles[0] || null);
    }
  }, [activeFile, openFiles]);

  const renameFile = useCallback((path: string, newName: string) => {
    const pathParts = path.split('/');
    pathParts[pathParts.length - 1] = newName;
    const newPath = pathParts.join('/');

    setFiles(prev => updateFileInTree(path, (file) => ({
      ...file,
      name: newName,
      path: newPath,
    }), prev));
  }, [updateFileInTree]);

  const openFile = useCallback((file: FileNode) => {
    if (file.type === 'folder') return;

    setOpenFiles(prev => {
      const exists = prev.find(f => f.path === file.path);
      if (exists) return prev;
      return [...prev, file];
    });
    setActiveFile(file);
  }, []);

  const closeFile = useCallback((path: string) => {
    setOpenFiles(prev => prev.filter(file => file.path !== path));
    if (activeFile?.path === path) {
      const remaining = openFiles.filter(file => file.path !== path);
      setActiveFile(remaining[0] || null);
    }
  }, [activeFile, openFiles]);

  const updateFileContent = useCallback((path: string, content: string) => {
    setFiles(prev => updateFileInTree(path, (file) => ({
      ...file,
      content,
    }), prev));

    setOpenFiles(prev => prev.map(file => 
      file.path === path ? { ...file, content } : file
    ));

    if (activeFile?.path === path) {
      setActiveFile(prev => prev ? { ...prev, content } : null);
    }
  }, [updateFileInTree, activeFile]);

  const saveFile = useCallback(async (path: string) => {
    const file = findFileByPath(path);
    if (!file) return;

    try {
      // Mock API call - replace with actual implementation
      await fetch('/api/files/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, content: file.content }),
      });
      console.log(`File saved: ${path}`);
    } catch (error) {
      console.error('Error saving file:', error);
    }
  }, [findFileByPath]);

  return {
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
  };
}