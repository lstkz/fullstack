import React from 'react';
import { Module } from 'shared';
import { Container } from 'src/components/Container';
import { Dashboard } from 'src/components/Dashboard';
import { ModuleInfo } from './ModuleInfo';

interface ModulesPageProps {
  modules: Module[];
}

export function ModulesPage(props: ModulesPageProps) {
  const { modules } = props;
  console.log(modules);
  return (
    <Dashboard>
      <Container data-test="courses-page" mt>
        {modules.map(item => (
          <ModuleInfo key={item.id} module={item} />
        ))}
      </Container>
    </Dashboard>
  );
}
