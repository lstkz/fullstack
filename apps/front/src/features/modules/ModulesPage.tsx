import React from 'react';
import { Module } from 'shared';
import { Dashboard } from 'src/components/Dashboard';
import { ModuleInfo } from './ModuleInfo';

interface ModulesPageProps {
  modules: Module[];
}

export function ModulesPage(props: ModulesPageProps) {
  const { modules } = props;
  return (
    <Dashboard>
      <div className="container mt-4 max-w-4xl mb-8" data-test="courses-page">
        {modules.map(item => (
          <ModuleInfo key={item.id} module={item} />
        ))}
      </div>
    </Dashboard>
  );
}
