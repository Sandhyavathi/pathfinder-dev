import React from 'react';
import { ProjectWorkspace } from '@/components/workspace';

export default function Workspace() {
  return (
    <ProjectWorkspace 
      projectName="Task Manager API"
      currentStep="Building your first REST API endpoints"
      progress={35}
    />
  );
}