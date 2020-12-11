import { ModuleDetails } from 'shared';
import React from 'react';
import { Container } from 'src/components/Container';
import { Dashboard } from 'src/components/Dashboard';
import { Heading } from 'src/components/Heading';
import { LessonsSection } from './LessonsSection';
import { TasksSection } from './TasksSection';
import { ModuleSummary } from './ModuleSummary';

interface ModulePageProps {
  module: ModuleDetails;
}

export function ModulePage(props: ModulePageProps) {
  const { module } = props;
  return (
    <Dashboard>
      <Container data-test="module-page" mt>
        <Heading type={3} my={4}>
          {module.name}
        </Heading>
        <ModuleSummary />
        <div className="grid md:grid-cols-2 gap-7">
          <LessonsSection module={module} />
          <TasksSection module={module} />
        </div>
      </Container>
    </Dashboard>
  );
}
