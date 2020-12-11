import React from 'react';
import { Module } from 'shared';
import { Container } from 'src/components/Container';
import { Dashboard } from 'src/components/Dashboard';
import { ModuleInfo } from './ModuleInfo';
import { ModuleInfoNext } from './ModuleInfoNext';

interface ModulesPageProps {
  modules: Module[];
}

export function ModulesPage(props: ModulesPageProps) {
  const { modules } = props;
  return (
    <Dashboard>
      <Container data-test="courses-page" mt>
        {modules.map(item => (
          <ModuleInfo key={item.id} module={item} />
        ))}
        <div style={{ marginTop: 20 }}>
          {modules.map(item => (
            <ModuleInfoNext key={item.id} module={item} />
          ))}
        </div>
      </Container>
    </Dashboard>
  );
}
