import { ModuleDetails } from 'shared';
import React from 'react';
import { Dashboard } from 'src/components/Dashboard';
import { LessonsSection } from './LessonsSection';
import { TasksSection } from './TasksSection';
import { ModuleSummary } from './ModuleSummary';
import { Heading } from 'src/components/Heading';

interface ModulePageProps {
  module: ModuleDetails;
}

export function ModulePage(props: ModulePageProps) {
  const { module } = props;
  return (
    <Dashboard>
      <div className="container mt-4" data-test="module-page">
        <Heading type={3} className="my-4">
          {module.name}
        </Heading>
        <ModuleSummary />
        <div className="grid md:grid-cols-2 gap-7">
          <LessonsSection module={module} />
          <TasksSection module={module} />
        </div>
      </div>
    </Dashboard>
  );
}
