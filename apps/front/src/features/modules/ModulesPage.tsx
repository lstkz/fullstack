import React from 'react';
import { Module } from 'shared';
import { Dashboard } from 'src/components/Dashboard';
import { HeadTitle } from 'src/components/HeadTitle';
import { track } from 'src/track';
import { ModuleInfo } from './ModuleInfo';

interface ModulesPageProps {
  modules: Module[];
}

export function ModulesPage(props: ModulesPageProps) {
  const { modules } = props;
  React.useEffect(() => {
    track({
      type: 'modules_viewed',
    });
  }, []);
  return (
    <Dashboard>
      <HeadTitle title="Moduły" />
      <div className="container mt-4 max-w-4xl mb-8" data-test="courses-page">
        {modules.map(item => (
          <ModuleInfo key={item.id} module={item} />
        ))}
      </div>
    </Dashboard>
  );
}
